import morgan from "morgan";

export const requestLogger =
    process.env.NODE_ENV === "development"
        ? morgan("dev")
        : morgan("combined");