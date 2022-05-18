import { jest } from "@jest/globals";

import readingRepository from "../../src/repositories/readingRepository";
import readingService from "../../src/services/readingService";
import readingBodyFactory from "../factories/readingBodyFactory";

describe("Test reading service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Reading finishing", () => {
    it("should throw not found error when reading doesn't exist", async () => {
      jest.spyOn(readingRepository, "findById").mockResolvedValue(null);
      const finish = jest
        .spyOn(readingRepository, "finishById")
        .mockResolvedValue(null);

      try {
        await readingService.finishById(1, 1);
      } catch (error) {
        expect(error.type).toBe("not_found");
      }
      expect(finish).toBeCalledTimes(0);
    });

    it("should throw unauthorized error when reading isn't of the user", async () => {
      const reading = readingBodyFactory();
      jest.spyOn(readingRepository, "findById").mockResolvedValue({
        id: 3,
        userId: 2,
        startDate: new Date(),
        endDate: null,
        currentPage: null,
        ...reading,
      });
      const finish = jest
        .spyOn(readingRepository, "finishById")
        .mockResolvedValue(null);

      try {
        await readingService.finishById(1, 3);
      } catch (error) {
        expect(error.type).toBe("unauthorized");
      }
      expect(finish).toBeCalledTimes(0);
    });

    it("should throw conflict error when reading is already finished", async () => {
      const reading = readingBodyFactory();
      jest.spyOn(readingRepository, "findById").mockResolvedValue({
        id: 1,
        userId: 1,
        startDate: new Date(),
        endDate: new Date(),
        currentPage: null,
        ...reading,
      });
      const finish = jest
        .spyOn(readingRepository, "finishById")
        .mockResolvedValue(null);

      try {
        await readingService.finishById(1, 1);
      } catch (error) {
        expect(error.type).toBe("conflict");
      }
      expect(finish).toBeCalledTimes(0);
    });
  });
});
