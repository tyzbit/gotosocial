/*
	GoToSocial
	Copyright (C) GoToSocial Authors admin@gotosocial.org
	SPDX-License-Identifier: AGPL-3.0-or-later

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Affero General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Affero General Public License for more details.

	You should have received a copy of the GNU Affero General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

"use strict";

const React = require("react");

const query = require("../../../lib/query");

const { useTextInput } = require("../../../lib/form");
const { TextInput } = require("../../../components/form/inputs");

const MutationButton = require("../../../components/form/mutation-button");

module.exports = function ExpireRemote({}) {
	const domainField = useTextInput("domain");

	const [expire, expireResult] = query.useInstanceKeysExpireMutation();

	function submitExpire(e) {
		e.preventDefault();
		expire(domainField.value);
	}

	return (
		<form onSubmit={submitExpire}>
			<h2>Expire remote instance keys</h2>
			<p>
				Mark all public keys from the given remote instance as expired.<br/><br/>
				This is useful in cases where the remote domain has had to rotate their keys for whatever
				reason (security issue, data leak, routine safety procedure, etc), and your instance can no
				longer communicate with theirs properly using cached keys. A key marked as expired in this way
				will be lazily refetched next time a request is made to your instance signed by the owner of that
				key.
			</p>
			<TextInput
				field={domainField}
				label="Domain"
				type="string"
				placeholder="example.org"
			/>
			<MutationButton label="Expire keys" result={expireResult} />
		</form>
	);
};
