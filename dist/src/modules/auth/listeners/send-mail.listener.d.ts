import { User } from "@/modules/user/entities/user.entity";
import { Repository } from "typeorm";
import { Queue } from "bull";
export declare class SendMailListener {
    private userRepository;
    private sendMailQueue;
    constructor(userRepository: Repository<User>, sendMailQueue: Queue);
    handleOrderCreatedEvent(payload: string): Promise<void>;
}
