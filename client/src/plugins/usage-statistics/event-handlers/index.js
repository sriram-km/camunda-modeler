/**
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership.
 *
 * Camunda licenses this file to you under the MIT; you may not use this file
 * except in compliance with the MIT License.
 */

import PingEventHandler from './PingEventHandler';
import DiagramOpenEventHandler from './DiagramOpenEventHandler';
import DeploymentEventHandler from './DeploymentEventHandler';
import VersionInfoOpenedEventHandler from './VersionInfoOpenedEventHandler';
import UserTrackedClickEventHandler from './UserTrackedClickEventHandler';

export default [
  PingEventHandler,
  DiagramOpenEventHandler,
  DeploymentEventHandler,
  VersionInfoOpenedEventHandler,
  UserTrackedClickEventHandler
];
