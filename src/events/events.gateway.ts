import {
    SubscribeMessage,
    WebSocketServer,
    WsResponse,
    WebSocketGateway,
} from "@nestjs/websockets";

import { from, Observable} from "rxjs";
import { map} from "rxjs/operators";
import { Server } from "ws";

@WebSocketGateway(8080)

export class EventGateWay {
    @WebSocketServer()
    server: Server;

    @SubscribeMessage("events")

    onEvent(client: any, data: any): Observable<WsResponse<number>> {
        return from([1, 2]).pipe(map(item => ({ event: "events", data: item })));
    }
}
