import { MailerService } from "@nestjs-modules/mailer";
import { User } from "@/modules/user/entities/user.entity";
import { Repository } from "typeorm";
export declare class SendMailListener {
    private userRepository;
    private mailerService;
    constructor(userRepository: Repository<User>, mailerService: MailerService);
    handleOrderCreatedEvent(payload: string): Promise<void>;
}
