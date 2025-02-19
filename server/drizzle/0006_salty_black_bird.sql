ALTER TABLE "users" ALTER COLUMN "firstName" SET DATA TYPE varchar(30);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "lastName" SET DATA TYPE varchar(35);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "email" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "password" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "avatar" SET DATA TYPE varchar(2048);--> statement-breakpoint
ALTER TABLE "blogs" ALTER COLUMN "title" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "comments" ALTER COLUMN "content" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "reactions" ALTER COLUMN "isLiked" DROP DEFAULT;