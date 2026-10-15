import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.jsx';
import './styles.css';
class ErrorBoundary extends React.Component {
 state={error:null};
 static getDerivedStateFromError(error){return {error};}
 render(){return this.state.error?<main className="fatal"><h1>Let’s recover your workspace.</h1><p>The interface encountered an unexpected problem. Your last saved project is still on this device.</p><pre>{this.state.error.message}</pre><button onClick={()=>location.reload()}>Reload workspace</button></main>:this.props.children;}
}
createRoot(document.getElementById('root')).render(<ErrorBoundary><App/></ErrorBoundary>);
