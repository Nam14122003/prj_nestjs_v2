import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { MailerService } from '@nestjs-modules/mailer';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/modules/user/entities/user.entity';
import { Repository } from 'typeorm';

@Processor('sendMailQueue')
export class SendMailProcessor {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private mailerService: MailerService,
    ) {}

    // @Process('sendMailJob')
    async handleSendMailJob(job: Job<unknown>) {
        console.log(job.data)
        const users = await this.userRepository.find();
        for (const user of users) {
            await this.mailerService.sendMail({
                to: user.email, // list of receivers
                subject: 'Post Your Article at ngocnam', // Subject line
                template: 'remind',
                context: {
                    name: user.lastName,
                },
            });
        }
        console.log(job); // Debug log
    }
}
