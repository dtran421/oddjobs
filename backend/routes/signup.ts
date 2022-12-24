import { FastifyInstance } from "fastify";
import { PostRequestParams } from "../lib/types";

import { supabase } from "../server";

const signup = (server: FastifyInstance, _: any, done: () => void) => {
    server.post("/", async (request, reply) => {
        const { data: posts, error } = await supabase.from("posts").select();

        if (error) {
            console.error(
                `[${new Date().toISOString()}] error: fetching posts`
            );
            reply.code(500).send("error: fetching posts");
        }

        return posts;
    });

    done();
};

export default signup;
