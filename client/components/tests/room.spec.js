import React from 'react'

import chai, { expect } from 'chai'
import { shallow, mount, render } from 'enzyme'
import sinon from 'sinon';

import socket from '../../socket'
import { Room } from '../room'

describe('Component: Room', () => {
    let roomWrapper
    const deleteStub = sinon.stub()
    Room.prototype.componentDidMount = sinon.stub()
    Room.prototype.handleDieClick = sinon.stub()

    beforeEach('create Room component wrapper', () => {
      roomWrapper = shallow(<Room
        delete={deleteStub}
        dragging={{bool: false}}
        routeProps={{
          match: {
            url: '/1',
            params:
            {roomid: 1}
          }
        }
      }/>)
    })

    afterEach('clear stubs', () => {
      deleteStub.reset()
    })

    describe('lifecycle methods', () => {
      it('calls componentDidMount', () => {
        expect(Room.prototype.componentDidMount.calledOnce).to.equal(true)
      })
    })

    describe('state check', () => {
      it('has an initial state', () => {
        expect(roomWrapper.state()).to.deep.equal({
          trashFloat: false,
          delete: false,
          toDelete: '',
          group: false,
          dieClicked: false,
          toggleConsole: false,
          colorOptions: [ 'black', 'red', 'blue', 'green' ],
          colorIndex: 0 })
      })
    })

    describe('view check', () => {
      it('renders Mainstage component', () => {
        expect(roomWrapper.find('Connect(MainStage)')).to.have.length(1)
      })
      
      it('renders AddBackground component', () => {
        expect(roomWrapper.find('Connect(AddBackground)')).to.have.length(1)
      })

      it('renders Drop component', () => {
        expect(roomWrapper.find('Connect(Drop)')).to.have.length(1)
      })

      it('renders DroupGroup component', () => {
        expect(roomWrapper.find('Connect(DropGroup)')).to.have.length(1)
      })

      it('renders RoomMessages component', () => {
        expect(roomWrapper.find('Connect(RoomMessages)')).to.have.length(1)
      })

      it('renders Video component', () => {
        expect(roomWrapper.find('Video')).to.have.length(1)
      })

      it('shows console in default view', () => {
        expect(roomWrapper.find('.room-container-console')).to.have.length(1)
      })
    })

    describe('actions and functions', () => {
      it('console view toggles to hidden when toggle button is clicked', () => {
        expect(roomWrapper.find('.room-container-console-hide')).to.have.length(0)
        roomWrapper.find('.room-container-console-toggle').simulate('click')
        expect(roomWrapper.find('.room-container-console-hide')).to.have.length(1)
      })

      it('clicking toggle button correctly sets state', () => {
        roomWrapper.find('.room-container-console-toggle').simulate('click')
        expect(roomWrapper.state().toggleConsole).to.equal(true)
      })

      it('clicking paint button correctly increments/decrements state.colorIndex', () => {
        let paintColorButton = roomWrapper.find('.room-container-console-right-paint').children()
        paintColorButton.simulate('click')
        expect(roomWrapper.state().colorIndex).to.equal(1)
        paintColorButton.simulate('click')
        paintColorButton.simulate('click')
        paintColorButton.simulate('click')
        expect(roomWrapper.state().colorIndex).to.equal(0)
      })

      it('clicking die button calls handleDieClick', () => {
        roomWrapper.find('.room-container-console-right-die').children().simulate('click')
        expect(Room.prototype.handleDieClick.calledOnce).to.equal(true)
      })

      it('mouse over trash icon sets state.trashFloat to true', () => {
        roomWrapper.find('.room-container-console-right-trash').children().simulate('mouseOver')
        expect(roomWrapper.state().trashFloat).to.equal(true)
      })

      describe('trash icon actions', () => {
        beforeEach('set props and simulate mouse over', () => {
          let trashIcon = roomWrapper.find('.room-container-console-right-trash').children()
          roomWrapper.setProps({
            dragging: {
              url: 'fakeUrl.com',
              personal: false,
              bool: true
            }})
          trashIcon.simulate('mouseOver')
        })

        it('on MouseUp, props.delete is called if state.delete = true', () => {
            roomWrapper.find('.room-container-console-right-trash').children().simulate('mouseUp')
            expect(deleteStub.calledOnce).to.equal(true)
          })

        it('on MouseUp, props.delete is NOT called if state.delete = false', () => {
          roomWrapper.setState({delete: false})
          roomWrapper.find('.room-container-console-right-trash').children().simulate('mouseUp')
          expect(deleteStub.called).to.equal(false)
        })

        describe('when props.dragging.bool = true, mouse over sets states:', () => {
          it('trashFloat', () => {
            expect(roomWrapper.state().trashFloat).to.equal(true)
          })

          it('delete', () => {
            expect(roomWrapper.state().delete).to.equal(true)
          })

          it('toDelete', () => {
            expect(roomWrapper.state().toDelete).to.equal('fakeUrl.com')
          })

          it('group', () => {
            expect(roomWrapper.state().group).to.equal(true)
          })
        })
        
        describe('mouse leave sets states: ', () => {
          beforeEach('simulate mouse leave', () => {
            roomWrapper.find('.room-container-console-right-trash').children().simulate('mouseLeave')
          })

          it('trashFloat', () => {
            expect(roomWrapper.state().trashFloat).to.equal(false)
            })

          it('delete', () => {
            expect(roomWrapper.state().delete).to.equal(false)
            })

          it('toDelete', () => {
            expect(roomWrapper.state().toDelete).to.equal('')
            })

          it('group', () => {
            expect(roomWrapper.state().group).to.equal(false)
          })
        })
      })
    })
})