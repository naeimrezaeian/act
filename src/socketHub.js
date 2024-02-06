import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'

class SocketHub {
    constructor() {
        this.client = new HubConnectionBuilder()
            //.withUrl('https://rec.rudn.site:7023/RecordVideoHub', { accessTokenFactory: () => localStorage.getItem("token") })
            .withUrl('https://rec.rudn.site:7023/RecordVideoHub', { accessTokenFactory: () => localStorage.getItem("token") })
            .configureLogging(LogLevel.Error)
            .withAutomaticReconnect()
            .build()
    }
    start() {
        this.client.start();
    }
}
export default new SocketHub();

