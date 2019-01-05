import React from "react";
import {
  HeaderCell,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@sendgrid/ui-components/table/table";
import Card from "@sendgrid/ui-components/card";
import Tooltip from "@sendgrid/ui-components/tooltip";
import { CSVLink } from "react-csv";
import moment from "moment";
import { Action, ActionsCell } from "@sendgrid/ui-components/actions";
import { Row } from "../../Row";
import { Column } from "../../Column";
import { WriteSelectors } from "../selectors";

function showIndividualChanges(
  changelog,
  changelogLimit,
  handleChangelogClicked
) {
  return changelog
    .slice(0, changelogLimit)
    .map((change, index) => (
      <IndividualChange
        key={change.created_at}
        index={index}
        change={change}
        handleChangelogClicked={handleChangelogClicked}
      />
    ));
}

const EmptyChangelog = () => (
  <Row>
    <Card
      icon="airplane"
      iconSize={40}
      title="No Previous Changes Found!"
      body="No changes have been previously made to this bounce rule."
      centered
    />
  </Row>
);

const Changelog = ({
  handleChangelogClicked,
  changelog,
  isChangelogEmpty,
  changelogLimit,
}) => (
  <div {...WriteSelectors.changelog}>
    <Row id="changelog-title">
      <Column width={1} offset={1}>
        <h2>Changelog</h2>
      </Column>
      <Column width={2} offset={11} className="changelog-csv sg-right">
        <CSVLink data={changelog} filename="changelog.csv" target="_blank">
          Export as CSV
        </CSVLink>
      </Column>
    </Row>
    {isChangelogEmpty && <EmptyChangelog />}
    {!isChangelogEmpty && (
      <Table>
        <TableHeader>
          <TableRow>
            <HeaderCell>Date</HeaderCell>
            <HeaderCell>User</HeaderCell>
            <HeaderCell>Commit Message</HeaderCell>
            <HeaderCell className="actions-cell">Actions</HeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {showIndividualChanges(
            changelog,
            changelogLimit,
            handleChangelogClicked
          )}
        </TableBody>
      </Table>
    )}
  </div>
);

const IndividualChange = ({ change, handleChangelogClicked, index }) => {
  const { created_at: createdAt, user_id: userId, comment } = change;

  return (
    <TableRow>
      <TableCell>{moment.unix(createdAt).format("MM/DD/YYYY LTS")}</TableCell>
      <TableCell>{userId}</TableCell>
      <TableCell>{comment}</TableCell>
      <ActionsCell>
        <Tooltip content="Revert to this change.">
          <Action
            className="changelog-view-icon"
            id="isRevertConfirmOpen"
            onClick={handleChangelogClicked}
            onKeyDown={handleChangelogClicked}
            index={index}
            icon="mc-return"
            role="button"
            tabIndex={0}
          />
        </Tooltip>
        <Tooltip content="View previous change details.">
          <Action
            className="changelog-view-icon"
            id="isChangeModalOpen"
            onClick={handleChangelogClicked}
            onKeyDown={handleChangelogClicked}
            index={index}
            icon="view"
            role="button"
            tabIndex={0}
          />
        </Tooltip>
      </ActionsCell>
    </TableRow>
  );
};

export default Changelog;
