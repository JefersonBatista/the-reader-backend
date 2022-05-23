import { jest } from "@jest/globals";

import readingIntentionBodyFactory from "../factories/readingIntentionBodyFactory";
import readingIntentionRepository from "../../src/repositories/readingIntentionRepository";
import readingIntentionService from "../../src/services/readingIntentionService";

describe("Test reading intention service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Creating reading intention", () => {
    it("should throw conflict error given an intention with same title", async () => {
      const intention = readingIntentionBodyFactory();
      jest.spyOn(readingIntentionRepository, "findByTitle").mockResolvedValue({
        id: 14,
        userId: 1,
        ...intention,
        date: new Date(),
        priority: 14,
      });

      const insert = jest
        .spyOn(readingIntentionRepository, "insert")
        .mockResolvedValue(null);

      try {
        await readingIntentionService.create(1, intention);
      } catch (error) {
        expect(error.type).toBe("conflict");
      }
      expect(insert).toBeCalledTimes(0);
    });
  });

  describe("Increasing reading intention priority", () => {
    it("should throw not found error when intention doesn't exist", async () => {
      jest
        .spyOn(readingIntentionRepository, "findByUserId")
        .mockResolvedValueOnce([]);
      jest
        .spyOn(readingIntentionRepository, "findByUserId")
        .mockResolvedValueOnce([
          {
            id: 1,
            userId: 1,
            title: "Any",
            author: null,
            date: new Date(),
            imageUrl: null,
            priority: 1,
          },
        ]);
      jest
        .spyOn(readingIntentionRepository, "findByUserId")
        .mockResolvedValueOnce([
          {
            id: 2,
            userId: 1,
            title: "Any",
            author: null,
            date: new Date(),
            imageUrl: null,
            priority: 1,
          },
        ]);

      const swapPriority = jest
        .spyOn(readingIntentionRepository, "swapIntentionPriorities")
        .mockResolvedValue(null);

      try {
        await readingIntentionService.increasePriorityById(1, 1);
      } catch (error) {
        expect(error.type).toBe("not_found");
      }
      try {
        await readingIntentionService.increasePriorityById(1, 1);
      } catch (error) {
        expect(error.type).toBe("not_found");
      }
      try {
        await readingIntentionService.increasePriorityById(1, 1);
      } catch (error) {
        expect(error.type).toBe("not_found");
      }
      expect(swapPriority).toBeCalledTimes(0);
    });
  });

  describe("Increasing reading intention priority", () => {
    it("should throw not found error when intention doesn't exist", async () => {
      jest
        .spyOn(readingIntentionRepository, "findByUserId")
        .mockResolvedValueOnce([]);
      jest
        .spyOn(readingIntentionRepository, "findByUserId")
        .mockResolvedValueOnce([
          {
            id: 1,
            userId: 1,
            title: "Any",
            author: null,
            date: new Date(),
            imageUrl: null,
            priority: 1,
          },
        ]);
      jest
        .spyOn(readingIntentionRepository, "findByUserId")
        .mockResolvedValueOnce([
          {
            id: 2,
            userId: 1,
            title: "Any",
            author: null,
            date: new Date(),
            imageUrl: null,
            priority: 1,
          },
        ]);

      const swapPriority = jest
        .spyOn(readingIntentionRepository, "swapIntentionPriorities")
        .mockResolvedValue(null);

      try {
        await readingIntentionService.decreasePriorityById(1, 1);
      } catch (error) {
        expect(error.type).toBe("not_found");
      }
      try {
        await readingIntentionService.decreasePriorityById(1, 1);
      } catch (error) {
        expect(error.type).toBe("not_found");
      }
      try {
        await readingIntentionService.decreasePriorityById(1, 1);
      } catch (error) {
        expect(error.type).toBe("not_found");
      }
      expect(swapPriority).toBeCalledTimes(0);
    });
  });

  describe("Deleting a reading intention", () => {
    it("should throw not found error when intention doesn't exist", async () => {
      jest
        .spyOn(readingIntentionRepository, "findById")
        .mockResolvedValue(null);

      const remove = jest
        .spyOn(readingIntentionRepository, "deleteById")
        .mockResolvedValue(null);

      try {
        await readingIntentionService.deleteById(1, 1);
      } catch (error) {
        expect(error.type).toBe("not_found");
      }
      expect(remove).toBeCalledTimes(0);
    });

    it("should throw unauthorized error when reading intention isn't of the user", async () => {
      const intention = readingIntentionBodyFactory();
      jest.spyOn(readingIntentionRepository, "findById").mockResolvedValue({
        id: 1,
        userId: 2,
        ...intention,
        date: new Date(),
        priority: 25,
      });

      const remove = jest
        .spyOn(readingIntentionRepository, "deleteById")
        .mockResolvedValue(null);

      try {
        await readingIntentionService.deleteById(1, 1);
      } catch (error) {
        expect(error.type).toBe("unauthorized");
      }
      expect(remove).toBeCalledTimes(0);
    });
  });
});
