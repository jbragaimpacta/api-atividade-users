import { Injectable, NestMiddleware } from "@nestjs/common";

@Injectable()
export class UserMiddleware implements NestMiddleware {
    use(req: any, res: any, next: () => void) {
        console.log(`Request URL: ${req.originalUrl}`);
        console.log(`Request Method: ${req.method}`);
        console.log('-----------------------------------');
        next();
        console.log(`Response Headers:`, res.getHeaders());
        console.log('-----------------------------------');
    }
}