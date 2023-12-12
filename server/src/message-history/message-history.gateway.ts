import { WebSocketGateway, WebSocketServer, SubscribeMessage, ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageHistoryService } from './message-history.service';

// Function to log rooms and clients
function logRoomsAndClients(server) {
  const rooms = server.sockets.adapter.rooms;
  const clients = server.sockets.adapter.sids;

  console.log("Rooms and Clients:");
  rooms.forEach((clientsInRoom, room) => {
    console.log(`Room: ${room}`);
    clientsInRoom.forEach(clientId => {
      console.log(` - Client ID: ${clientId}`);
    });
  });
}

@WebSocketGateway({
  cors: {
    origin: '*', // Allow connections from any origin
  },
})
export class MessageHistoryGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private server: Server;

  // Map to keep track of deviceIds and their clientIds
  private deviceIdMap = new Map<string, Set<string>>();

  constructor(private readonly messageHistoryService: MessageHistoryService) {}

  // Called after the module initialization
  onModuleInit() {
    // Listen to the historyUpdated event from the MessageHistoryService
    this.messageHistoryService.on('historyUpdated', ({ deviceId, chatbotId, history }) => {
      // Filter out the system prompt before emitting to clients
      const filteredHistory = history.filter(msg => msg.role !== 'system');

      // logRoomsAndClients(this.server)

      // Emit the updated history to all connected clients
      this.server.to(`${deviceId}-${chatbotId}`).emit('serverHistoryPush', filteredHistory);
    });
  }

  // Handle new WebSocket connections
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    // Here you need to determine the deviceId and chatbotId from the client
    // For this example, assume they are part of the client's query parameters
    // Create a room identified by the device and chatbot ID
    const deviceId = client.handshake.query.deviceId;
    const chatbotId = client.handshake.query.chatbotId;
    client.join(`${deviceId}-${chatbotId}`);

    const deviceIdValue = Array.isArray(deviceId) ? deviceId[0] : deviceId;
    const chatbotIdValue = Array.isArray(chatbotId) ? chatbotId[0] : chatbotId;

    // Update deviceIdMap on new connection (keeping count)
    const clientIdSet = this.deviceIdMap.get(deviceIdValue) || new Set();
    clientIdSet.add(client.id);
    this.deviceIdMap.set(deviceIdValue, clientIdSet);

    // Log the number of unique deviceIds
    // console.log(`Number of active deviceIds: ${this.deviceIdMap.size}`);

    // Emit the current message history to the newly connected client, excluding the system prompt
    const history = this.messageHistoryService.getHistory(deviceIdValue, chatbotIdValue).filter(msg => msg.role !== 'system');
    // console.log("Message history upon connection:", history);
    this.server.to(`${deviceId}-${chatbotId}`).emit('serverHistoryPush', history);
  }

  // Handle disconnections
  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);

    // Update deviceIdMap on disconnection (keeping count)
    const deviceId = client.handshake.query.deviceId;
    const deviceIdValue = Array.isArray(deviceId) ? deviceId[0] : deviceId;
    const clientIdSet = this.deviceIdMap.get(deviceIdValue);

    if (clientIdSet) {
      clientIdSet.delete(client.id);
      if (clientIdSet.size === 0) {
        this.deviceIdMap.delete(deviceIdValue);
      }
    }
    // Log the number of unique deviceIds
    // console.log(`Number of active deviceIds: ${this.deviceIdMap.size}`);
  }

  // Listen for client requests for the latest message history
  @SubscribeMessage('requestChatHistory')
  handleMessageHistoryRequest(@ConnectedSocket() client: Socket, @MessageBody() data: any): void {
    // Retrieve deviceId and chatbotId from data or client object
    const { deviceId, chatbotId } = data; // Or get these from the client object
    // Emit the latest message history to the requesting client, excluding the system prompt
    const history = this.messageHistoryService.getHistory(deviceId, chatbotId).filter(msg => msg.role !== 'system');
    client.emit('serverHistoryPush', history);
  }
}
