//import ReactShallowRenderer from "react-test-renderer/shallow";
import React from "react";
import Header from "../../components/Header";
import {shallow} from "enzyme"; //uso esto porque tiene mas features que react-test-renderer
//import toJSON from "enzyme-to-json"; //si no configure para que use serializer, uso esto

test("Should render Header correctly", ()=>{
  const wrapper = shallow(<Header />);
  expect(wrapper).toMatchSnapshot();

  //find funciona como querySelector;
  //expect(wrapper.find("h1").text()).toBe("expensify");

});


/*  const renderer  = new ReactShallowRenderer();
    renderer.render(<Header />); */
    //para obtener el output de la linea anterior hago lo de abajo, pero no hago assertions sobre eso
    //console.log(renderer.getRenderOutput()); esto me da lo que hace React para representar un componente: tiene un div, x hijos etc
   //expect(renderer.getRenderOutput()).toMatchSnapshot();
   //en 1ra corrida se genera snapshot y test no concluye porque no tiene con que comparar, en 2da corrida checkea si hay cambios.
   // esto me genera carpeta __snapshots__, no la toco, solo reviso si esta bien el output
   // si cambio algo en el componente, una nueva prueba fallaria y me dice que hubo cambios, si los quiero aceptar --> u