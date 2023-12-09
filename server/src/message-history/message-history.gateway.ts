import { WebSocketGateway, WebSocketServer, SubscribeMessage, ConnectedSocket, MessageBody } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageHistoryService } from './message-history.service';

@WebSocketGateway({
  cors: {
    origin: '*', // Adjust according to your security requirements
  },
})
export class MessageHistoryGateway {
  @WebSocketServer()
  private server: Server;

  constructor(private readonly messageHistoryService: MessageHistoryService) {}

  onModuleInit() {
    
    // Listen to the historyUpdated event from the MessageHistoryService
    this.messageHistoryService.on('historyUpdated', (history) => {
      // Emit the updated history to all connected client
      this.server.emit('receiveChatHistory', history);
    });
  }

  // Handle new WebSocket connections
  handleConnection(client: Socket) {
    // Emit the current message history to the newly connected client
    const history = this.messageHistoryService.getHistory();
    client.emit('receiveChatHistory', history);
  }

  // Handle disconnections
  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  // Listen for client requests for the latest message history
  @SubscribeMessage('requestChatHistory')
  handleMessageHistoryRequest(@ConnectedSocket() client: Socket, @MessageBody() data: any): void {
    // Emit the latest message history to the requesting client
    const history = this.messageHistoryService.getHistory();
    client.emit('receiveChatHistory', history);
  }
}
