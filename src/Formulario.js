import React, { useState } from 'react';
import axios from 'axios'; // 
import VistaPrevia from './VistaPrevia';
import styled, { keyframes } from 'styled-components';

// Definir colores y estilos
const backgroundColor = '#F9F9F9'; // Color de fondo claro
const buttonColor = '#1d3465'; // Color del botón
const borderColor = '#ccc'; // Color del borde de los campos de entrada

const Container = styled.div`
  max-width: 500px;
  margin: auto;
  padding: 20px;
  background-color: ${backgroundColor};
  box-shadow: 0px 4px 6px #ccc;
  border-radius: 8px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
`;

const StyledInput = styled.input`
  padding: 10px;
  border-radius: 4px;
  border: 1px solid ${borderColor};
  
`;

const StyledTextArea = styled.textarea`
  padding: 10px;
  border-radius: 4px;
  border: 1px solid ${borderColor};
  width: auto;
`;

const StyledButton = styled.input`
padding: 10px;
border-radius: 4px;
background-color: ${buttonColor};
color: #fff;
font-size: 1rem;
font-weight:600;
cursor: pointer;
transition: background-color 0.2s;

&:hover {
  background-color: #1C77DF;
}
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: auto;
`;

const Row = styled.div`
  display: flex;
  gap: 10px;
`;

// Animación del Spinner de carga
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;
const Spinner = styled.div`
  border: 4px solid #f3f3f3;
  border-radius: 50%;
  border-top: 4px solid #3498db;
  width: 30px;
  height: 30px;
  animation: ${spin} 1s linear infinite;
`;
function Formulario() {
  // Define el estado para cada campo del formulario
  const [nombreCliente, setNombreCliente] = useState('');
  const [nombreProyecto, setNombreProyecto] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [detallesUbicacion, setDetallesUbicacion] = useState('');
  const [tiposViviendas, setTiposViviendas] = useState('');
  const [rangosArea, setRangosArea] = useState('');
  const [rangoPrecios, setRangoPrecios] = useState('');
  const [amenidades, setAmenidades] = useState('');
  const [financiamiento, setFinanciamiento] = useState('');
  const [instruccionesAdicionales, setInstruccionesAdicionales] = useState('');
  const [apiKey, setApiKey] = useState('');

  // Spinner de carga
  const [cargando, setCargando] = useState(false);

  const [contenidoGenerado, setContenidoGenerado] = useState(''); // Nuevo estado
  const [mensajeError, setMensajeError] = useState(''); // Nuevo estado para el mensaje de error

  // Define la función que se ejecutará al enviar el formulario
  const handleSubmit = async (event) => {
    // Previene el comportamiento predeterminado del formulario
    event.preventDefault();
    setCargando(true);

      try {
      // Define la URL de la API y el modelo que quieres usar
      const apiUrl = 'https://api.openai.com/v1/chat/completions';
      const model = 'gpt-3.5-turbo';
  
      // Define el contenido del mensaje y el prompt
      const basePrompt = `Redacta un email de bienes raíces para el cliente ${nombreCliente} sobre el proyecto ${nombreProyecto} ubicado en ${ubicacion}.`;
      let additionalInfo = '';

      if (detallesUbicacion) additionalInfo += ` Detalles de la Ubicación: ${detallesUbicacion}.`;
      if (tiposViviendas) additionalInfo += ` Tipos de Viviendas Ofrecidas: ${tiposViviendas}.`;
      if (rangosArea) additionalInfo += ` Rangos, en m², de áreas disponibles: ${rangosArea}.`;
      if (rangoPrecios) additionalInfo += ` Rango de Precios de las unidades en Venta: ${rangoPrecios}.`;
      if (amenidades) additionalInfo += ` Amenidades Destacadas: ${amenidades}.`;
      if (financiamiento) additionalInfo += ` Financiamiento Disponible: ${financiamiento}.`;
        
      const finalPrompt = instruccionesAdicionales ? `${basePrompt}${additionalInfo}. Instrucciones Adicionales: ${instruccionesAdicionales}` : `${basePrompt}${additionalInfo}`;
      const messages = [{ role: 'user', content: finalPrompt }];
  
      // Define los parámetros de la solicitud
      const params = {
        model: model,
        messages: messages,
        temperature: 0.7,
      };

      // Realiza la petición a la API de OpenAI
      const response = await axios.post(apiUrl, params, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
      });

      // Extrae y muestra la respuesta generada
      const generatedContent = response.data.choices[0].message.content;
      setContenidoGenerado(generatedContent);

      // Si la petición es exitosa, asegúrate de limpiar el mensaje de error
      setMensajeError('');

    } catch (error) {
        // Actualiza el estado con el mensaje de error
        setMensajeError('Error al conectar con la API de OpenAI. Por favor, verifica tu API Key.');
      } finally {
        setCargando(false);
      }
  };

  return (
    <Container>
      <Title>Haciendo la tarea de Lulú 🤯</Title>
      <p>Esta App te ayuda a crear emails personalizados sin -casi- mover un dedo, ¡ideal para alcahuetear la pereza y sorprender a tus clientes!</p>
      <br/>
      <StyledForm onSubmit={handleSubmit}>      
      <StyledLabel>
    *Cliente:
    <StyledInput
      type="text"
      value={nombreCliente}
      onChange={(e) => setNombreCliente(e.target.value)}
      required
    />
  </StyledLabel>      
      <br/>
      <Row>
        <Column>        
      <StyledLabel>
    *Proyecto:
    <StyledInput
      type="text"
      value={nombreProyecto}
      onChange={(e) => setNombreProyecto(e.target.value)}
      required
    />
  </StyledLabel>      
      </Column>
      <br/>
      <Column>      
      <StyledLabel>
    *Ubicación:
    <StyledInput
      type="text"
      value={ubicacion}
      onChange={(e) => setUbicacion(e.target.value)}
      placeholder="Ciudad"
      required
    />
  </StyledLabel>        
        </Column>
      </Row>  
      <br/>
      <Row>
        <Column> 
      <StyledLabel>
  Detalles Ubicación:
  <StyledInput
    type="text"
    value={detallesUbicacion}
    onChange={(e) => setDetallesUbicacion(e.target.value)}
    placeholder="Zona, Barrio, Características del área"
  />
</StyledLabel>
</Column>
<br/>
  <Column>
<StyledLabel>
  Viviendas:
  <StyledInput
    type="text"
    value={tiposViviendas}
    onChange={(e) => setTiposViviendas(e.target.value)}
    placeholder="Casas, Departamentos, Terrenos, etc."
  />
</StyledLabel>
</Column>
</Row>
<br/>
<Row>
<Column>
<StyledLabel>
  Rango Áreas:
  <StyledInput
    type="text"
    value={rangosArea}
    onChange={(e) => setRangosArea(e.target.value)}
    placeholder="Ej. De 100m² a 200m²"
  />
</StyledLabel>
</Column>

<br/>

  <Column>
<StyledLabel>
  Rango Precios:
  <StyledInput
    type="text"
    value={rangoPrecios}
    onChange={(e) => setRangoPrecios(e.target.value)}
    placeholder="Ej. Desde $100,000 Hasta $200,000"
  />
</StyledLabel>
</Column>
</Row>
<br/>
<Row>
<Column>
<StyledLabel>
  Amenidades:
  <StyledTextArea
    value={amenidades}
    onChange={(e) => setAmenidades(e.target.value)}
  ></StyledTextArea>
</StyledLabel>
</Column>

<br/>

  <Column>
<StyledLabel>
  Financiamiento:
  <StyledInput
    type="text"
    value={financiamiento}
    onChange={(e) => setFinanciamiento(e.target.value)}
  />
</StyledLabel>
</Column>
</Row>
<br/>
<StyledLabel>
  Instrucciones Adicionales:
  <StyledTextArea
    value={instruccionesAdicionales}
    onChange={(e) => setInstruccionesAdicionales(e.target.value)}
    placeholder="Ej.: email corto y conciso, tutear al cliente, usar tono comercial, etc."  
  ></StyledTextArea>
</StyledLabel>
<br/>


      <StyledLabel>
        *Llave de OpenAI:
        <StyledInput
          type="text"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="sk-123456789abczxyf"
          
        />
      </StyledLabel>
      <br/>
            
      <StyledButton type="submit" value="Generar Email"/>
      </StyledForm>
      

    {cargando && (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50px' }}>
        <Spinner />
      </div>
    )}
    {/* Muestra el mensaje de error si existe */}
    {mensajeError && <div style={{ color: 'red' }}>{mensajeError}</div>}

{/* Pasa el contenido generado como prop a VistaPrevia */}
<VistaPrevia contenido={contenidoGenerado} />

</Container>
  );
}

export default Formulario;
