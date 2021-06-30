import { Component, Mixins } from 'vue-property-decorator';
import VueFormGenerator from 'vue-form-generator';

@Component
export default class VFGFieldRubro extends Mixins(VueFormGenerator.abstractField) {
  public schema: any;
  private items: any = [];
  private value: any = {};

  private get fields() {
    return [
      {key: "nombre", label: "Nombre", class:"vw-40"},
      {key: "accepted", label: "Aceptado"},
      {key: "amount", label: "Monto", class: "vw-20"}
    ]
  }

  public get total() {
    return this.items.reduce((acc: Number, curr: { amount: Number })=>Number(acc) + Number(curr.amount), 0);
  }

  beforeMount() {
    this.items = this.schema.rubros.map((item: any)=>{
      return {
        nombre: item.nombre,
        accepted: false,
        amount: 0
      }
    });
    this.value = {
      rubros: this.items,
      total: this.total
    };
  }
}
