import Hapi from "@hapi/hapi";

export class ServerConfiguration {
  private _server;

  static create(
    port: number,
    host: string,
    routes
  ): ServerConfiguration {
    return new ServerConfiguration(
      port, 
      host,
      routes
    );
  }

  constructor(
    port: number, 
    host: string,
    routes,
  ) {
    this._server = Hapi.server({
      port,
      host,
    }); 

    this._server.route(routes);   
  }

  async start() {
    await this._server.start();
    console.log("Server running on %s", this._server.info.uri);
  }

  async initialize() {
    await this._server.initialize()
  }

  async server() {
    return this._server;
  }
}


