import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "@/modules/user/entities/user.entity";
import {Repository} from "typeorm";
import {InjectQueue} from "@nestjs/bull";
import {Queue} from "bull";


@Injectable()
export class SendMailListener {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectQueue('sendMailQueue') private sendMailQueue: Queue,    ) {
    }

    @OnEvent('send mail')
    async handleOrderCreatedEvent(payload: string) {
        await this.sendMailQueue.add('sendMailJob', {
            payload,
        });
        // const waitingJobs = await this.sendMailQueue.getFailed();
        // for (const job of waitingJobs) {
        //     await job.remove();
        // }
    }
}