ALTER TABLE "blogs" DROP CONSTRAINT "blogs_userId_users_id_fk";
--> statement-breakpoint
ALTER TABLE "comments" DROP CONSTRAINT "comments_userId_users_id_fk";
--> statement-breakpoint
ALTER TABLE "comments" DROP CONSTRAINT "comments_blogId_blogs_id_fk";
--> statement-breakpoint
ALTER TABLE "interactions" DROP CONSTRAINT "interactions_userId_users_id_fk";
--> statement-breakpoint
ALTER TABLE "interactions" DROP CONSTRAINT "interactions_blogId_blogs_id_fk";
--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "email" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "password" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "createdAt" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "isActive" SET DEFAULT true;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "isActive" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "avatar" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "blogs" ALTER COLUMN "userId" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "blogs" ALTER COLUMN "title" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "blogs" ALTER COLUMN "description" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "blogs" ALTER COLUMN "createdAt" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "blogs" ALTER COLUMN "isActive" SET DEFAULT true;--> statement-breakpoint
ALTER TABLE "blogs" ALTER COLUMN "isActive" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "comments" ALTER COLUMN "content" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "comments" ALTER COLUMN "commentedAt" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "firstName" varchar(20) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "lastName" varchar(25) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "refreshToken" text;--> statement-breakpoint
ALTER TABLE "blogs" ADD COLUMN "deletedAt" timestamp;--> statement-breakpoint
ALTER TABLE "interactions" ADD COLUMN "isLiked" boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE "interactions" ADD COLUMN "reactionAt" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "blogs" ADD CONSTRAINT "blogs_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_blogId_blogs_id_fk" FOREIGN KEY ("blogId") REFERENCES "public"."blogs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "interactions" ADD CONSTRAINT "interactions_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "interactions" ADD CONSTRAINT "interactions_blogId_blogs_id_fk" FOREIGN KEY ("blogId") REFERENCES "public"."blogs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "name";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "surname";--> statement-breakpoint
ALTER TABLE "interactions" DROP COLUMN "like";--> statement-breakpoint
ALTER TABLE "interactions" DROP COLUMN "dislike";--> statement-breakpoint
ALTER TABLE "interactions" DROP COLUMN "interactionAt";