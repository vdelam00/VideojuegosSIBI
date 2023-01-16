import { Injectable } from '@angular/core';
import { empresa } from '../models/empresa';
import { plataforma } from '../models/plataforma';
import { genero } from '../models/genero';
import { usuario } from '../models/usuario';
import { videojuego } from '../models/videojuego';
var neo4j = require('neo4j-driver');
@Injectable({
  providedIn: 'root',
})
export class DbConnectorService {
  public driver: any;
  constructor() {
    const uri = 'neo4j+s://71f265a1.databases.neo4j.io';
    const user = 'neo4j';
    const password = 'WnRif4GLOsQwEpRoGy4jWevlV5F6E_660b7jlqu_FQg';
    this.driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
  }

  public async getVideojuegos(): Promise<videojuego[]> {
    return new Promise(async (ful) => {
      const session = this.driver.session({ database: 'neo4j' });
      let data: videojuego[] = [];
      const writeQuery = `MATCH(juego:Videojuego)
                          RETURN juego`;
      const writeResult = await session.executeWrite((tx: any) =>
        tx.run(writeQuery, {})
      );

      // Check the write results.
      writeResult.records.forEach((record: { get: (arg0: string) => any }) => {
        const videojuego: videojuego = record.get('juego')
          .properties as videojuego;
        data.push(videojuego);
      });
      session.close();
      ful(data);
    });
  }
  public async setVideojuego(videojuego: videojuego): Promise<any> {
    return new Promise(async (ful) => {
      const session = this.driver.session({ database: 'neo4j' });
      const writeQuery =
        `MATCH(juego:Videojuego {nombre: '` +
        videojuego.nombre +
        `'})
                          SET juego.like = '` +
        videojuego.like +
        `'
                          SET juego.favorito = '` +
        videojuego.favorito +
        `'
                          SET juego.dislike = '` +
        videojuego.dislike +
        `'
                          RETURN juego.like`;
      const writeResult = await session.executeWrite((tx: any) =>
        tx.run(writeQuery, {})
      );
      session.close();
      ful(true);
    });
  }

  public async getEmpresa(): Promise<empresa[]> {
    return new Promise(async (ful) => {
      const session = this.driver.session({ database: 'neo4j' });
      let data: empresa[] = [];
      const writeQuery = `MATCH(e:Empresa)
                          RETURN e`;
      const writeResult = await session.executeWrite((tx: any) =>
        tx.run(writeQuery, {})
      );

      // Check the write results.
      writeResult.records.forEach((record: { get: (arg0: string) => any }) => {
        const company = record.get('e').properties;
        data.push(company);
      });
      session.close();
      ful(data);
    });
  }

  public async getPlataforma(): Promise<plataforma[]> {
    return new Promise(async (ful) => {
      const session = this.driver.session({ database: 'neo4j' });
      let data: plataforma[] = [];
      const writeQuery = `MATCH(pl:Plataforma)
                          RETURN pl`;
      const writeResult = await session.executeWrite((tx: any) =>
        tx.run(writeQuery, {})
      );

      // Check the write results.
      writeResult.records.forEach((record: { get: (arg0: string) => any }) => {
        const company = record.get('pl').properties;
        data.push(company);
      });
      session.close();
      ful(data);
    });
  }

  public async getGenero(): Promise<genero[]> {
    return new Promise(async (ful) => {
      const session = this.driver.session({ database: 'neo4j' });
      let data: genero[] = [];
      const writeQuery = `MATCH(g:Genero)
                          RETURN g`;
      const writeResult = await session.executeWrite((tx: any) =>
        tx.run(writeQuery, {})
      );

      // Check the write results.
      writeResult.records.forEach((record: { get: (arg0: string) => any }) => {
        const company = record.get('g').properties;
        data.push(company);
      });
      session.close();
      ful(data);
    });
  }

  public async getUsuario(): Promise<usuario[]> {
    const session = this.driver.session({ database: 'neo4j' });
    return new Promise(async (ful) => {
      let data: usuario[] = [];
      const writeQuery = `MATCH(u:Usuario)
                          RETURN u`;
      const writeResult = await session.executeWrite((tx: any) =>
        tx.run(writeQuery, {})
      );

      // Check the write results.
      writeResult.records.forEach((record: { get: (arg0: string) => any }) => {
        const company = record.get('u').properties;
        data.push(company);
      });
      session.close();
      ful(data);
    });
  }
}
