import { Job } from 'bull';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '@/modules/user/entities/user.entity';
import { Repository } from 'typeorm';
export declare class SendMailProcessor {
    private userRepository;
    private mailerService;
    constructor(userRepository: Repository<User>, mailerService: MailerService);
    handleSendMailJob(job: Job<unknown>): Promise<void>;
}
