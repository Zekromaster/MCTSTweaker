/// <reference path="typings/globals/node/index.d.ts"/>

function createFile(name: string, content: string) {
  var fs = require('fs');
  fs.writeFileSync(name, content);
}


interface IStack{
  getContent():string;
  getQuantity():number;
}

interface IRegistreable{
  register(): void;
  write(): void;
}

interface IRecipe<I extends IStack, O extends IStack> extends IRegistreable{
  getInput(): Array<I>|I;
  getOutput(): Array<O>|O;
  getName(): string;
}

var recipeList:Array<IRegistreable> = [];

export class ItemStack implements IStack{
  private content: string;
  private quantity: number;
  private data: number;
  constructor(content: string, quantity: number, data?:number){
    this.content = content;
    this.quantity = quantity;
    this.data = data;
  }
  public getContent(): string{
    return this.content;
  }
  public getQuantity(): number{
    return this.quantity;
  }
  public getData(): number{
    return this.data;
  }
  public setContent(a: string): void{
    this.content = a;
  }
  public setQuantity(a: number): void{
    this.quantity= a;
  }
  public setData(a: number): void{
    this.data = a;
  }
  public json(item: boolean, count: boolean, data:boolean): object{
    var ret:object = {};
    if (item) {ret['item'] = this.content}
    if (count) {ret['count'] = this.quantity}
    if (data && this.data != null) {ret['data'] = this.data}
    return ret;
  }
}

export class ShapelessRecipe implements IRecipe<ItemStack, ItemStack>{
  private input:Array<ItemStack>;
  private output:ItemStack;
  public constructor(output: ItemStack, input:Array<ItemStack>){
    this.input = input;
    this.output = output;
  }
  public getInput(): Array<ItemStack>{
    return this.input;
  }
  public getOutput(): ItemStack{
    return this.output;
  }
  public register(){
    recipeList.push(this);
  }
  private nameFromStack(s: ItemStack, inp?: boolean): string{
    if (inp) {
      return s.getContent().replace(":", "_");
    } else {
      return s.getQuantity() + "_" + s.getContent().replace(":", "-");
    }
  }
  public getName(): string{
    var nameofthis:string = "";
    for (let element of this.getInput()){
      nameofthis = nameofthis + this.nameFromStack(element, true) + "_";
    }
    nameofthis = nameofthis + "makes_" + this.nameFromStack(this.getOutput());
    return nameofthis;
  }
  public write(): void{
    var arrInput:Array<object> = [];
    for (let element of this.getInput()){
      arrInput.push(element.json(true, false, true));
    }
    var jsonedRecipe:object = {type: "crafting_shapeless", ingredients: arrInput, result: this.getOutput().json(true, true, true)}
    createFile(this.getName() + ".json", JSON.stringify(jsonedRecipe));
  }
}

export class ShapedRecipe implements IRecipe<ItemStack, ItemStack>{
  private input:Array<[string, ItemStack]>;
  private output:ItemStack;
  private pattern:Array<string>;
  private name: string;
  public constructor(name: string, output: ItemStack, pattern: Array<string>, input:Array<[string, ItemStack]>){
    this.name = name;
    this.input = input;
    this.output = output;
    this.pattern = pattern;
  }
  public getInput(): Array<ItemStack>{
    var inpArr:Array<ItemStack> = [];
    for (let element of this.input){
      inpArr.push(element[1]);
    }
    return inpArr;
  }
  public getRawInput(): Array<[string, ItemStack]>{
    return this.input;
  }
  public getOutput(): ItemStack{
    return this.output;
  }
  public register(){
    recipeList.push(this);
  }
  public getName(): string{
    return this.name;
  }
  public write(): void{
    var key:object = {};
    for (let o of this.getRawInput()){
      key[o[0]] = o[1].json(true, false, true);
    }
    var obj = {
      type: "crafting_shaped",
      pattern: this.pattern,
      key: key,
      result: this.getOutput().json(true, true, true)
    }
    createFile(this.getName() + ".json", JSON.stringify(obj));
  }
}

export function push(){
  for (let element of recipeList){
    element.write();
  }
}
