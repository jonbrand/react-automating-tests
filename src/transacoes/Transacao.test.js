import React from "react";
import { render } from '@testing-library/react';
import Transacao from "./Transacao"
/* import Transacoes from "./Transacoes"; */

describe('Componente de transacao do extrato', () => {
  it('o snapshot de componente deve permanecer sempre o mesmo', () => {
    const { container } = render(
      <Transacao
        data='08/09/2020'
        tipo='saque'
        valor='20.00'
      />
    )

    expect(container.firstChild).toMatchSnapshot();
  });

 /*  it('o snapshot de componente deve conter uma lista de transacao', () => {
    const { container } = render(
      <Transacoes
        transacoes= {
          [
            ['03/10/2020', 'saque', '30.00'],
            ['03/10/2021', 'deposito', '700.00']
          ]
        }
      />
    )

    expect(container.firstChild).toMatchSnapshot();
  }) */
})