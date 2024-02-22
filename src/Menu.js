import React from "react";
import { inject, observer } from "mobx-react";
import './style.css'

class Menu extends React.Component {
    nombreRef = React.createRef();
    fotoRef = React.createRef();

    render() {
        const { ArepaStore } = this.props;

        return (
            <div className="container">
                <div>
                    <h1 id="titulo">Almacen fotográfico</h1>
                </div>
                <h1 id="cantidad">Hay {ArepaStore.numeroArepas} fotos</h1>
                <div>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            ArepaStore.agregarArepa({
                                nombre: this.nombreRef.current.value,
                                foto: this.fotoRef.current.value,
                            });
                            e.target.reset();
                        }}
                    >
                        <b>Descripción:</b>
                        <input
                            type="text"
                            placeholder="Descripción"
                            required
                            ref={this.nombreRef}
                        />
                        <br />
                        <b>URL:</b>
                        <input
                            type="text"
                            placeholder="Foto URL"
                            required
                            ref={this.fotoRef}
                        />
                        
                        <br />
                        <button id="agregarBtn" type="submit">Agregar fotografía</button>
                    </form>
                </div>
                <br />
                <div className="image-list">
                    {ArepaStore.arepas.map((arepa) => (
                        <div className="image-item" key={arepa.foto}>
                            <img
                                src={arepa.foto}
                                alt={arepa.nombre}
                                style={{ maxWidth: "200px", borderRadius:"5px" }}
                            />
                            <h3>{arepa.nombre}</h3>
                            <div>
                                <button id="eliminarBtn"
                                    onClick={() => {
                                        ArepaStore.borrarArepa(arepa.nombre);
                                    }}
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <button id="borrarBtn" onClick={() => ArepaStore.borrarArepas()}>Borrar almacén</button>
            </div>
            
        );
    }
}

export default inject("ArepaStore")(observer(Menu));