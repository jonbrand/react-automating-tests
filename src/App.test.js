import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import App, { calcularNovoSaldo } from './App';
import Conta from './conta/Conta';

describe('Componente principal', () => {
  describe('Quando eu abro o app', () => {
    it('deve mostrar o nome do banco', () => {
      render(<App />);
  
      expect(screen.getByText('ByteBank')).toBeInTheDocument();
    });
  
    it('deve mostrar saldo do banco', () => {
      render(<App />);
  
      expect(screen.getByText('Saldo:')).toBeInTheDocument();
    });
  
    it('deve mostrar o botao transacao', () => {
      render(<Conta />);
  
      expect(screen.getByText('Realizar operação')).toBeInTheDocument();
    });
  });

  describe('Quando eu realizo uma transacao', () => {
    it('que e um saque, o valor vai diminuir', () => {
      const valores = {
        transacao: 'saque',
        valor: 50
      };

      const novoSaldo = calcularNovoSaldo(valores, 150);

      expect(novoSaldo).toBe(100);
    })

    it('que e um deposito, o valor vai aumentar', () => {
      const valores = {
        transacao: 'deposito',
        valor: 50
      };

      const novoSaldo = calcularNovoSaldo(valores, 150);

      expect(novoSaldo).toBe(200);
    });

    it('que e um saque, a transacao deve ser realizada', () => {
      render(<App />);

      const saldo = screen.getByText('R$ 1000');
      const transacao = screen.getByLabelText('Saque');
      const valor = screen.getByTestId('valor');
      const botaoTransacao = screen.getByText('Realizar operação');

      expect(saldo.textContent).toBe('R$ 1000');

      fireEvent.click(transacao, { target: { value: 'Saque'}});

      fireEvent.change(valor, { target: { value: 10 }});

      fireEvent.click(botaoTransacao);

      expect(saldo.textContent).toBe('R$ 990');
    });
  })
});