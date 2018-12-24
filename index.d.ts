// Type definitions for Nodejs Utils
// Project: https://github.com/pravindot17/mysqllib
// Definitions by: Pravin Lolage
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
declare module 'mysqllib'

export async function init(obj: object): Promise<any>
export async function select(query: string, queryParams?: array): Promise<any>
export async function insert(query: string, queryParams?: array): Promise<any>
export async function update(query: string, queryParams?: array): Promise<any>
export function close(): Promise<any>
export function getPoolConnection(): Promise<any>
export function poolQuery(pool: any, query: string, queryParams?: array): Promise<any>