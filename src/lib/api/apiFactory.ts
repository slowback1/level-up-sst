import { DATABASE_TYPE } from '$env/static/private';
import type IAPI from "./IApi";
import API from "./api";
import DynamoAccessor from "./dynamoAccessor";

export default class ApiFactory {
    static Create(): IAPI {
        const databaseType = DATABASE_TYPE ?? "strapi";

        switch (databaseType) {
            case "strapi":
                return new API();
            case "dynamo":
                return new DynamoAccessor();
        }

        throw new Error("Invalid Database Type");
    }
}