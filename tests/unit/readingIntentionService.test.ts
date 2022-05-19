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
});
