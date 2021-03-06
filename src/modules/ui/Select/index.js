import React, { Component } from 'react'
import PropTypes from 'prop-types'


import Autocomplete from "src/modules/autocomplete";

// import {
//   persons as objectsQuery,
//   person as objectQuery,
// } from "src/modules/query";


export default class Select extends Component {

  static propTypes = {
    objectsQuery: PropTypes.object.isRequired,
    objectQuery: PropTypes.object.isRequired,
  }

  static contextTypes = {
    client: PropTypes.object.isRequired,
  }

  state = {
    inputValue: "",
    items: [],
  }



  componentDidMount() {

    const {
      value,
    } = this.props;

    if (value) {
      this.loadObject(value);
    }

  }

  componentWillReceiveProps(newProps, newState) {

    const {
      value,
    } = newProps;

    const {
      value: prevValue,
    } = this.props;

    if ((value || prevValue) && value !== prevValue) {
      this.loadObject(value);
    }

  }


  async loadData() {

    let items = [];

    const {
      client,
    } = this.context;

    const {
      inputValue,
    } = this.state;

    const {
      objectsQuery,
    } = this.props;





    let where = {};


    if (inputValue) {

      where = {
        AND: inputValue.split(" ").filter(n => n && n.length >= 2).map(n => ({
          OR: [
            {
              name_contains: n,
            },
          ],
        })),
      };

    }


    await client.query({
      query: objectsQuery,
      variables: {
        first: 10,
        where,
      },
    })
      .then(r => {

        const {
          objects,
        } = r.data || {};

        items = objects ? objects.map(n => {

          const {
            id: value,
            name,
          } = n;

          const label = name;

          return {
            ...n,
            value,
            label,
          }
        }) : [];

      })
      .catch(console.error)

    this.setState({
      items,
    });

  }


  async loadObject(id) {

    const {
      client,
    } = this.context;

    const {
      objectQuery,
    } = this.props;


    let object;

    if (id) {

      await client.query({
        query: objectQuery,
        variables: {
          where: {
            id,
          },
        },
      })
        .then(r => {

          object = r.data && r.data.object || null;

        })
        .catch(console.error);

    }

    this.setState({
      object,
    });
  }


  render() {

    const {
      label,
      inputProps,
      onChange,
      value,
      name,
      ...other
    } = this.props;


    const {
      items,
      opened,
      object,
      inputValue,
    } = this.state;

    let displayValue = opened && inputValue !== undefined ?
      inputValue :
      object && object.name || ""
      ;


    return (
      <Autocomplete
        name={name}
        inputProps={{
          label,
          ...inputProps
        }}
        onChange={(event, value) => {
          // event.persist()


          this.setState({
            inputValue: value,
            object: null,
          }, () => {

            onChange && onChange({
              target: {
                name,
                value: null,
              },
            });

            this.loadData();
          });
        }}
        onSelect={(value, item) => {

          // this.loadObject(id);
          this.setState({
            inputValue: undefined,
            object: item,
          }, () => {
            onChange && onChange({
              target: {
                name,
                value: item.id,
              },
            });
          });
        }}
        items={items}
        onMenuVisibilityChange={opened => {


          if (opened && !items.length) {
            this.loadData();
          }

          this.setState({
            opened,
          });
        }}
        value={displayValue || inputValue || ""}
        {...other}
      />
    )
  }
}
