var DropdownWidget = function(id, array, escolhida, divider) {
  this.id = id;
  this.array = array;
  this.escolhida = escolhida;
  this.divider = divider;

  if (array) this.escolhida = escolhida || array[0];

  this.template = '<li ><a class="dropdownItem">';
  this.templateFinal = '</a></li>';
  this.templateDivider = '<div class="divider"></div>';

  this.callback = function() {};
}

DropdownWidget.prototype.init = function() {
  this.dropdown = document.getElementById(this.id);

  console.log(this.id);

  this.button = this.dropdown.querySelector('button');
  this.dropdownLabel = this.dropdown.querySelector('.dropdownLabel');
  this.dropdownlist = this.dropdown.querySelector('ul');

  this.atualizarLista();
  this.atualizarEscolhida();

}

DropdownWidget.prototype.setArray = function(array) {
  this.array = array;
}

DropdownWidget.prototype.setEscolhida = function(escolhida) {
  this.escolhida = escolhida;
}
DropdownWidget.prototype.getEscolhida = function() {
  return this.escolhida;
}


DropdownWidget.prototype.atualizarEscolhida = function() {
  if (this.escolhida && this.dropdownLabel) {
    this.dropdownLabel.innerHTML = this.escolhida;
  }
}

DropdownWidget.prototype.atualizarLista = function() {
  var template = '';
  var that = this;
  that.first = true;

  if (this.array && this.dropdown) {
    this.array.forEach(function(el) {

      if (that.divider && that.first) {
        template += that.template + el + that.templateFinal + that.templateDivider;
        that.first = false;
      } else {
        template += that.template + el + that.templateFinal;
      }
      
    });
    this.dropdownlist.innerHTML = template;

    var itens = this.dropdown.querySelectorAll('.dropdownItem');
    Array.prototype.forEach.call(itens, function(element, index) {
      element.addEventListener('click', function (e) {
        that.setEscolhida(that.array[index]);
        that.atualizarEscolhida();
        that.callback(index);
      });
    });

  }
}

DropdownWidget.prototype.atualizarTudo = function(array) {
  this.setArray(array);
  this.setEscolhida(array[0]);
  this.atualizarEscolhida();
  this.atualizarLista();
}

DropdownWidget.prototype.bindClick = function(callback) {
  this.callback = callback;
}

DropdownWidget.prototype.desabilitar = function() {
  this.button.disabled = true;
  this.button.classList.add('btnDisabled');
}

DropdownWidget.prototype.habilitar = function() {
  this.button.disabled = false;
  this.button.classList.remove('btnDisabled');
}