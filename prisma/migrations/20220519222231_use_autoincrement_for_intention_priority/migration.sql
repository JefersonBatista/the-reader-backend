-- AlterTable
CREATE SEQUENCE "readingintentions_priority_seq";
ALTER TABLE "readingIntentions" ALTER COLUMN "priority" SET DEFAULT nextval('readingintentions_priority_seq');
ALTER SEQUENCE "readingintentions_priority_seq" OWNED BY "readingIntentions"."priority";
