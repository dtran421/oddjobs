import { FastifyInstance } from "fastify";
import { REPL_MODE_SLOPPY } from "repl";
import { PostRequestParams } from "../lib/types";

import { supabase } from "../server";

const posts = (server: FastifyInstance, _: any, done: () => void) => {
    server.get("/", async (_request, reply) => {
        const { data: posts, error } = await supabase.from("posts").select();

        if (error) {
            console.error(`[${new Date().toISOString()}] error: fetching post`);
            reply.code(500).send("error: fetching posts");
        }

        return posts;
    });

    server.get("/:postId", async (request, reply) => {
        const { postId } = request.params as PostRequestParams;

        if (!postId) {
            console.error(
                `[${new Date().toISOString()}] error: no post id provided`
            );
            reply.code(400).send("no post id provided");
        }

        const { data: posts, error } = await supabase
            .from("posts")
            .select()
            .eq("id", postId);

        if (error) {
            console.error(`[${new Date().toISOString()}] error: fetching post`);
            reply.code(500).send("error: fetching post");
        }

        return posts;
    });

    done();
};

export default posts;
