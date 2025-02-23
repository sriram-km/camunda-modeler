/**
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership.
 *
 * Camunda licenses this file to you under the MIT; you may not use this file
 * except in compliance with the MIT License.
 */

/* global sinon */

import React from 'react';

import { mount } from 'enzyme';

import {
  SlotFillRoot,
  Slot
} from '../../slot-fill';

import { EngineProfile, getAnnotatedVersion, getStatusBarLabel } from '../EngineProfile';

import { ENGINES, ENGINE_PROFILES } from '../../../util/Engines';

import { DEFAULT_ENGINE_PROFILE as bpmnEngineProfile } from '../bpmn/BpmnEditor';
import { DEFAULT_ENGINE_PROFILE as cloudBpmnEngineProfile } from '../cloud-bpmn/BpmnEditor';
import { DEFAULT_ENGINE_PROFILE as dmnEngineProfile } from '../dmn/DmnEditor';
import { DEFAULT_ENGINE_PROFILE as cloudDmnEngineProfile } from '../cloud-dmn/DmnEditor';
import { DEFAULT_ENGINE_PROFILE as formEngineProfile } from '../form/FormEditor';

const spy = sinon.spy;


describe('<EngineProfile>', function() {

  let wrapper;

  afterEach(function() {
    if (wrapper && wrapper.exists()) {
      wrapper.unmount();
    }
  });


  it('should render', function() {

    // given
    wrapper = renderEngineProfile({
      engineProfile: bpmnEngineProfile
    });

    // then
    expect(wrapper.exists()).to.be.true;
  });


  it('should open', function() {

    // given
    wrapper = renderEngineProfile({
      engineProfile: bpmnEngineProfile
    });

    // when
    wrapper.find('button').simulate('click');

    // then
    expect(wrapper.find('EngineProfileOverlay').exists()).to.be.true;
  });


  it('should close', function() {

    // given
    wrapper = renderEngineProfile({
      engineProfile: bpmnEngineProfile
    });

    wrapper.find('button').simulate('click');

    // when
    wrapper.find('button').simulate('click');

    // then
    expect(wrapper.find('EngineProfileOverlay').exists()).to.be.false;
  });


  it('should filter versions', function() {

    // given
    wrapper = renderEngineProfile({
      engineProfile: { ...cloudDmnEngineProfile, executionPlatformVersion: '8.0.0' },
      onChange: () => {},
      filterVersions: version => version === '8.0.0'
    });

    // when
    wrapper.find('button').simulate('click');

    // then
    expect(wrapper.find('option').length).to.equal(1);
  });


  describe('show selected engine profile', function() {

    eachProfile((executionPlatform, executionPlatformVersion) => {

      it(`should show selected engine profile (${executionPlatform} ${executionPlatformVersion})`, function() {

        // given
        wrapper = renderEngineProfile({
          engineProfile: {
            executionPlatform,
            executionPlatformVersion,
          },
          onChange: () => { }
        });

        // when
        wrapper.find('button').simulate('click');

        // then
        expect(wrapper.find('EngineProfileOverlay').exists()).to.be.true;

        expectVersion(wrapper, executionPlatformVersion);
      });

    });

  });


  describe('set engine profile', function() {

    eachProfile((executionPlatform, executionPlatformVersion) => {

      it(`should set engine profile (${executionPlatform} ${executionPlatformVersion})`, function() {

        // given
        const onChangeSpy = spy();

        wrapper = renderEngineProfile({
          engineProfile: {
            executionPlatform,
            executionPlatformVersion: null
          },
          onChange: onChangeSpy
        });

        wrapper.find('button').simulate('click');

        // when
        selectVersion(wrapper, executionPlatformVersion);

        // then
        expect(onChangeSpy).to.have.been.calledOnce;
        expect(onChangeSpy).to.have.been.calledWith({
          executionPlatform,
          executionPlatformVersion
        });
      });

    });

  });


  describe('#getAnnotatedVersion', function() {

    it('should return correct annotated versions', function() {

      // given
      const inputs =
      [ [ '1.0', 'Zeebe 1.0' ],
        [ '1.2', 'Zeebe 1.2' ],
        [ '10.0', '10.0' ],
        [ '7.14', '7.14' ],
        [ '8.0', '8.0' ],
        [ '8.1', '8.1' ] ];

      // then
      inputs.forEach((input) => {
        expect(getAnnotatedVersion(input[0])).to.equal(input[1]);
      });

    });

  });

  describe('#getStatusBarLabel', function() {

    it('should return correct annotated versions', function() {

      // given
      const inputs =
      [ [ ENGINES.PLATFORM, '7.0', 'Camunda Platform 7.0' ],
        [ ENGINES.PLATFORM, '7.14', 'Camunda Platform 7.14' ],
        [ ENGINES.PLATFORM, '', 'Camunda Platform 7' ],
        [ ENGINES.CLOUD, '1.3', 'Camunda Platform 8 (Zeebe 1.3)' ],
        [ ENGINES.CLOUD, '8.1', 'Camunda Platform 8.1' ],
        [ ENGINES.CLOUD, '', 'Camunda Platform 8' ] ];

      // then
      inputs.forEach((input) => {
        expect(getStatusBarLabel({
          executionPlatform: input[0],
          executionPlatformVersion: input[1]
        })).to.equal(input[2]);
      });

    });

  });


  describe('BPMN', function() {

    it('should show description', function() {

      // given
      wrapper = renderEngineProfile({
        engineProfile: bpmnEngineProfile
      });

      // when
      wrapper.find('button').simulate('click');

      // then
      expectPlatformHelp(wrapper);
    });


    it('should show selection', function() {

      // given
      wrapper = renderEngineProfile({
        engineProfile: bpmnEngineProfile,
        onChange: () => { }
      });

      // when
      wrapper.find('button').simulate('click');

      // then
      expectPlatformHelp(wrapper);
    });

  });


  describe('Cloud BPMN', function() {

    it('should show description', function() {

      // given
      wrapper = renderEngineProfile({
        engineProfile: cloudBpmnEngineProfile
      });

      // when
      wrapper.find('button').simulate('click');

      // then
      expectCloudHelp(wrapper);
    });


    it('should show selection', function() {

      // given
      wrapper = renderEngineProfile({
        engineProfile: cloudBpmnEngineProfile,
        onChange: () => { }
      });

      // when
      wrapper.find('button').simulate('click');

      // then
      expectCloudHelp(wrapper);
    });

  });


  describe('DMN', function() {

    it('should show description', function() {

      // given
      wrapper = renderEngineProfile({
        engineProfile: dmnEngineProfile
      });

      // when
      wrapper.find('button').simulate('click');

      // then
      expectPlatformHelp(wrapper);
    });


    it('should show selection', function() {

      // given
      wrapper = renderEngineProfile({
        engineProfile: dmnEngineProfile,
        onChange: () => { }
      });

      // when
      wrapper.find('button').simulate('click');

      // then
      expectPlatformHelp(wrapper);
    });

  });


  describe('Cloud DMN', function() {

    it('should show description', function() {

      // given
      wrapper = renderEngineProfile({
        engineProfile: cloudDmnEngineProfile
      });

      // when
      wrapper.find('button').simulate('click');

      // then
      expectCloudHelp(wrapper);
    });


    it('should show selection', function() {

      // given
      wrapper = renderEngineProfile({
        engineProfile: cloudDmnEngineProfile,
        onChange: () => { }
      });

      // when
      wrapper.find('button').simulate('click');

      // then
      expectCloudHelp(wrapper);
    });
  });


  describe('Form', function() {

    it('should show description', function() {

      // given
      wrapper = renderEngineProfile({
        engineProfile: formEngineProfile
      });

      // when
      wrapper.find('button').simulate('click');

      // then
      expectPlatformHelp(wrapper);
    });


    it('should show selection', function() {

      // given
      wrapper = renderEngineProfile({
        engineProfile: formEngineProfile,
        onChange: () => { }
      });

      // when
      wrapper.find('button').simulate('click');

      // then
      expectPlatformHelp(wrapper);
    });

  });

});


// helpers //////////

function renderEngineProfile(options = {}) {
  const {
    type,
    engineProfile,
    onChange,
    ...rest
  } = options;

  return mount(
    <SlotFillRoot>
      <Slot name="status-bar__file" />
      <EngineProfile
        type={ type }
        engineProfile={ engineProfile }
        onChange={ onChange }
        { ...rest } />
    </SlotFillRoot>
  );
}


function eachProfile(fn) {
  ENGINE_PROFILES.forEach(({ executionPlatform, executionPlatformVersions }) => {
    [ undefined, ...executionPlatformVersions ].forEach((executionPlatformVersion) => {
      fn(executionPlatform, executionPlatformVersion);
    });
  });
}


function expectHelpText(wrapper, helpLink) {
  expect(wrapper.find('EngineProfileOverlay').exists()).to.be.true;
  expect(wrapper.find('a').exists()).to.be.true;
  expect(wrapper.find('a').prop('href')).to.equal(helpLink);
}

function expectCloudHelp(wrapper) {
  expectHelpText(wrapper, 'https://docs.camunda.io/?utm_source=modeler&utm_medium=referral');
}

function expectPlatformHelp(wrapper) {
  expectHelpText(wrapper, 'https://docs.camunda.org/manual/latest/');
}

function selectVersion(wrapper, version) {

  const select = wrapper.find('select');

  if (select.instance().value !== version) {
    select.simulate('change', { target: { value: version || '' } });
  }

  wrapper.find('form').simulate('submit');
}


function expectVersion(wrapper, version) {
  const select = wrapper.find('select');

  expect(select.prop('value')).to.equal(version || '');
}
