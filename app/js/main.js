import { Spinner, ButtonGroup, Button, Glyph, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'elemental';
import GoogleMap from 'google-map-react';
var React = require('react');
var ReactDOM = require('react-dom');

window.$loading = function() {
  ReactDOM.render(<Spinner size="lg" type="primary" />, document.getElementById('content'));
}

window.$render = function(northData, southData, locations) {
  var DeparturesCanvas = React.createClass({
    getInitialState: function() {
      return { selected: 'north'
              ,isModalOpen: false
              ,pins: false }
    }
   ,toggleStation: function() {
      var selected = this.state.selected;
      selected = selected === 'north' ? 'south' : 'north';
      this.setState({ selected: selected
                     ,isModalOpen: false
                     ,pins: false });
    }
   ,toggleModal: function(origin, destin) {
      var selected = this.state.selected;
      var modalOpen = this.state.isModalOpen;
      var pins = null;
      if(!modalOpen == true) {
        var orig = locations.find(function(d) { return d.stop == origin });
        var dest = locations.find(function(d) { return d.stop == destin });
        pins = [{lat: orig.lat, lng:orig.long}, {lat:dest.lat, lng:dest.long}];
      }
      this.setState({ selected: selected
                     ,isModalOpen: !modalOpen
                     ,pins: pins });
    }
   ,render: function() {
      var selected = this.state.selected;
      var modalOpen = this.state.isModalOpen;
      var pins = this.state.pins;
      var modalProps = pins ? {center: [42.360768, -71.060944], zoom: 9} : {};
      var data = selected ==='north' ? this.props.dataNorth : this.props.dataSouth;
      var mapOptions = { styles: [{ stylers: [{ 'saturation': -60 }, { 'gamma': 0.8 }, { 'lightness': 4 }, { 'visibility': 'on' }] }] };
      var modalToggle = this.toggleModal;
      var self = this;
      return (
        <div className="canvas">
          <div>
            <h1 className="header title">
              <div className="logo-container"><img src="img/logo-mbta.gif" /></div>
              <div className="toggle-buttons">
                <ButtonGroup>
                  <Button size="lg" type={selected === 'north' ? 'warning' : 'default-warning'} onClick={selected === 'north' ? null : this.toggleStation}>
                    <Glyph icon="eye-watch" /> North Station</Button>
                  <Button size="lg" type={selected === 'north' ? 'default-primary' : 'primary'} onClick={selected === 'north' ? this.toggleStation : null}>
                    <Glyph icon="eye-watch" /> South Station</Button>
                </ButtonGroup>
              </div>
            </h1>
          </div>
          <div className="container">
          <Modal isOpen={modalOpen} onCancel={this.toggleModal} backdropClosesModal>
            <ModalHeader text="See where you're going!" showCloseButton onClose={this.toggleModal} />
            <ModalBody>
              <div className="mapCanvas">
                {!modalOpen ? null :
                <GoogleMap bootstrapURLKeys={{key: '/* GOOGLE_MAP_API_KEY */'}} options={mapOptions} {...modalProps}>
                  <div {...pins[0]}><strong><Glyph icon="pin" size="lg" type="warning" />Station</strong></div>
                  <div {...pins[1]}><strong><Glyph icon="pin" size="lg" type="primary" />Destination</strong></div>
                </GoogleMap>}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button type={selected == 'north' ? 'warning' : 'primary'} onClick={this.toggleModal}>Close</Button>
            </ModalFooter>
          </Modal>
            <Table>
              <colgroup>
                <col width="10%" />
                <col width="" />
                <col width="25%" />
                <col width="5%" />
                <col width="15%" />
              </colgroup>
              <thead>
                <tr>
                  <th className="header">Trip</th>
                  <th className="header">Destination</th>
                  <th className="header">Departure</th>
                  <th className="header">Track</th>
                  <th className="header">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.map(function(item, i) {
                  function formatDate(input) {
                    var date = new Date(input);
                    var pm = date.getHours() > 12;
                    return (date.getHours() == 0 ? '12' : pm ? date.getHours() - 12 : date.getHours()) + ':' +
                           (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) +
                           (date.getHours() >= 12 ? ' PM' : ' AM');
                  }
                  var openModal = modalToggle.bind(self, item.origin, item.destination);
                  var deptime = formatDate(item.scheduledtime);
                  var lateness = item.lateness > 0 ? '('+(item.lateness / 60)+' min. late)' : '';
                  return (
                    <tr key={i} className={item.lateness > 0 ? 'Alert--danger' : i%2==0 ? selected=='north' ? 'Alert--warning' : 'Alert--info' : ''}>
                      <td>{item.trip}</td>
                      <td>{item.destination}<Button type={selected == 'north' ? 'default-warning' : 'default-primary'} onClick={openModal}><Glyph icon="globe" /></Button></td>
                      <td>{deptime} <span className="late">{lateness}</span></td>
                      <td>{item.track == 0 ? '' : item.track}</td>
                      <td>{item.status}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
      );
    }
  });

  ReactDOM.render(<DeparturesCanvas dataNorth={northData} dataSouth={southData} />
                 ,document.getElementById('content'));
}
