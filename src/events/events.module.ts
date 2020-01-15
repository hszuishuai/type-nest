import { EventGateWay } from "./events.gateway";
import { Module } from "@nestjs/common";

@Module({
    providers: [EventGateWay],
})

export class EventModule {}
