import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import {MailerService} from "@nestjs-modules/mailer";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "@/modules/user/entities/user.entity";
import {Repository} from "typeorm";


@Injectable()
export class SendMailListener {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private mailerService: MailerService,
    ) {
    }

    @OnEvent('send mail')
    async handleOrderCreatedEvent(payload: string) {
        const users = await this.userRepository.find();
        for (const user of users) {
            this.mailerService
                .sendMail({
                    to: user.email, // list of receivers
                    subject: 'Activate Your Account at ngocnam', // Subject line
                    template: 'remind',
                    context: {
                        name: user.lastName
                    }
                })
        }
    }
}