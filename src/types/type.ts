import type { Server as HTTPServer } from 'http'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Socket as NetSocket } from 'net'
import type { Server as IOServer, Socket as SocketType } from 'socket.io'

interface SocketServer extends HTTPServer {
  io?: IOServer | undefined
}

interface SocketWithIO extends NetSocket {
  server: SocketServer
}

export interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO;
  clientSocket?: SocketType;
}

export interface IUser {
  profileId: string;
  address?: string;
  chainId?: string;
  domain?: string;
  metamaskId?: string;
  nonce?: string;
  uri?: string;
  version?: string;
  aboutMe?: string;
  posts?: Partial<IPost>[];
  email_address?: string;
  last_name?: string;
  first_name?: string;
  createdAt?: Date;
  [x: string]: any;
}

export interface IPost {
  title: string;
  description?: string;
  user?: Partial<IUser>;
  createdAt: Date;
  [x: string]: any;

}

