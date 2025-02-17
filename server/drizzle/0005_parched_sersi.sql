ALTER TABLE "comments" ADD COLUMN "deletedAt" timestamp;--> statement-breakpoint
ALTER TABLE "comments" ADD COLUMN "isCommented" boolean DEFAULT true;