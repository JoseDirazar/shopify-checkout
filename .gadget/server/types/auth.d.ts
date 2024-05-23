/// <reference types="node" />
/// <reference types="node/http" />
/// <reference types="got/dist/source/core/utils/timed-out" />
import { FastifyReply, FastifyRequest } from "fastify";
declare module "fastify" {
    interface FastifyRequest {
        gadgetAuth?: {
            redirectToSignIn: boolean;
            signInPath: string;
        };
    }
}
export declare const generateCode: (numBytes?: number) => string;
export declare const hashCode: (code: string) => string;
/**
 * Safely compares a password reset code and hash
 * @param {string} [code] - The password reset code
 * @param {string} [hash] - The hashed password reset code
 * @returns {boolean} - Whether the code is valid or not
 */
/**
 * Utility function to wrap route handlers with protection from unauthenticated requests.
 *
 * @param handler The route handler to protect
 * @param {ProtectedRouteOptions} options Options for the protected route
 * @returns handler function that is wrapped with route protection
 *
 * @example
 * ```ts
 * // routes/GET-protected-route.js
 * const { preValidation } = require("@gadgetinc/auth");
 *
 * module.exports = async ({ request, reply }) => {
 *  await reply.send("this is a protected route");
 * }
 *
 * module.options = {
 *  preValidation,
 * }
 * ```
 */
export declare const preValidation: <RouteContext extends FastifyRequest<import("fastify").RouteGenericInterface, import("fastify").RawServerDefault, import("http").IncomingMessage, import("fastify").FastifySchema, import("fastify").FastifyTypeProviderDefault, unknown, import("fastify").FastifyBaseLogger, import("fastify/types/type-provider").ResolveFastifyRequestType<import("fastify").FastifyTypeProviderDefault, import("fastify").FastifySchema, import("fastify").RouteGenericInterface>>>(request: RouteContext, reply: FastifyReply) => Promise<void>;
