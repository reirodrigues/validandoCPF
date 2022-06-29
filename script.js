// 705.484.450-52  /  070.987.720-03
/*
7x 0x 5x 4x 8x 4x 4x 5x 0x
10 9  8  7  6  5  4  3  2
70 0  40 28 48 20 16 15 0 = 237

11 - (237 % 11) = 5 (Primeiro digito) // Se o numero for maior que 9 então sera 0

7x 0x 5x 4x 8x 4x 4x 5x 0x 5x
11 10 9  8  7  6  5  4  3  2
77 0  45 32 56 24 20 20 0 10 = 248

11 - (284 % 11) = 2 (Segundo digito) // Se o numero for maior que 9 então sera 0

705.484.450-52 === 705.484.450-52 (Valido)
*/


function ValidaCPF(cpfEnviado) {
  Object.defineProperty(this, 'cpfLimpo', {
    get: function () {
      return cpfEnviado.replace(/\D+/g, '')
    }
  })
}

ValidaCPF.prototype.valida = function () {
  if (typeof this.cpfLimpo === 'undefined') return false
  if (this.cpfLimpo.length !== 11) return false;
  if(this.isSequencia()) return false;

  const cpfParcial = this.cpfLimpo.slice(0, -2)
  const digito1 = this.getDigito(cpfParcial)
  const digito2 = this.getDigito(cpfParcial + digito1)

  const novoCPF = `${cpfParcial}${digito1}${digito2}`

  return novoCPF === this.cpfLimpo
}

ValidaCPF.prototype.getDigito = function (cpfParcial) {
  const cpfArray = Array.from(cpfParcial)

  let contador = cpfArray.length + 1
  const total = cpfArray.reduce((ac, val) =>{
    ac += (contador * Number(val))
    contador--;
    return ac;
  }, 0);

  const digito = 11 - (total % 11);
  return digito > 9 ? 0 : digito;
}

ValidaCPF.prototype.isSequencia = function() {
  return this.cpfLimpo[0].repeat(this.cpfLimpo.length) === this.cpfLimpo ? true : false;
};

const cpf = new ValidaCPF('111.131.111-11')

if(cpf.valida()){
  console.log('CPF Válido')
} else {
  console.log('CPF Inválido')
}
