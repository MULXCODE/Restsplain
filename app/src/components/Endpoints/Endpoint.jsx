import React, { PropTypes } from 'react'
import EndpointResponse from '../../containers/EndpointResponse'
import RouteParameters from './RouteParameters'
import Parameters from './Parameters'
import Curl from './Curl'
import { trim, getRouteReadable, makeID } from '../../helpers/formatting'
import config from '../../data/config'

const Endpoint = ({ route }) => {

  let resource = (route._links && route._links.self) || `${trim(config.restbase, '/')}${route.self}`

  console.log(route)

  return (
      <section className="restsplain-endpoint" >

        <h1>
          {getRouteReadable(route.self)}
        </h1>

        <div className="restsplain-endpoint-url">
          <h3>Resource URL</h3>
          <p><em>{getRouteReadable(resource)}</em></p>
          <RouteParameters route={route.self} />
        </div>

        { route.endpoints.map( (endpoint, id) => (
          <div key={id} className="restspain-endpoint-data">
            <h2
              id={makeID([...endpoint.methods])}
            >
              {endpoint.methods.join(', ')}
            </h2>

            <Parameters args={endpoint.args || {}} />

            <Curl methods={endpoint.methods} resource={resource} args={endpoint.args || {}} />

            { endpoint.methods.join('') === 'GET' &&
              <EndpointResponse resource={resource} contexts={(endpoint.args.context && endpoint.args.context.enum) || ['view']} />
            }

            {
              // Try fetching yourself?
              // arg builder?
            }

          </div>
        ) ) }

      </section>
  )
}

Endpoint.propTypes = {
  route: PropTypes.object.isRequired
}

export default Endpoint