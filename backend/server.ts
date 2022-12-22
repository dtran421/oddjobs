import * as dotenv from "dotenv";
dotenv.config();

import fastify from "fastify";
import { createClient } from "@supabase/supabase-js";
import { Database } from "./lib/database.types";

import posts from "./routes/posts";

const supabaseUrl =
    process.env.NODE_ENV === "dev"
        ? (process.env.SUPABASE_URL_DEV as string)
        : (process.env.SUPABASE_URL_PROD as string);

const supabaseKey =
    process.env.NODE_ENV === "dev"
        ? (process.env.SUPABASE_KEY_DEV as string)
        : (process.env.SUPABASE_KEY_PROD as string);

// Create a single supabase client for interacting with your database
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

const server = fastify();

server.register(posts, { prefix: "/posts" });

server.get("/ping", async (_request, _response) => {
    return "pong\n";
});

server.listen({ port: 8000 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});

export { supabase, server };
