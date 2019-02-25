import React from "react";
import Button from "@sendgrid/ui-components/button";
import { TextInput } from "@sendgrid/ui-components/text-input";
import CenterModal from "@sendgrid/ui-components/center-modal";
import Alert from "@sendgrid/ui-components/alert";
import { Column } from "../../../Column";
import { Row } from "../../../Row";
import "./index.scss";
import { WriteSelectors } from "../../selectors";

const DeleteAlertBody = () => (
  <div>
    <Row>
      <Column>
        <div>
          <h2>There was an error deleting this rule.</h2>
          <p>
            The rule may have already been removed. If the problem persists,
            please try again later.
          </p>
        </div>
      </Column>
    </Row>
  </div>
);

const DeleteConfirmationAlert = ({ handleModalClose }) => (
  <CenterModal
    {...WriteSelectors.deleteAlert}
    open
    hasX
    renderBody={<DeleteAlertBody />}
    id="isDeleteAlertOpen"
    onClose={handleModalClose}
  />
);

const ConfirmModalBody = ({
  selectedRule,
  handleModalClose,
  handleDeleteConfirm,
  handleDeleteCommit,
  isCommitEmpty,
}) => (
  <div>
    <Row>
      <Column>
        <div>
          <h2>Are you sure you&apos;d like to delete this rule?</h2>
          {isCommitEmpty && (
            <Alert
              {...WriteSelectors.emptyCommitAlert}
              dismissable={false}
              type="danger"
              onClick={handleModalClose}
              id="isInvalidInput"
            >
              Commit message must not be empty.
            </Alert>
          )}
          <p>
            Doing so will effect how current email will be handled via this
            bounce rule. This action will go into effect immediately.
          </p>
          <p>Please enter a commit message and confirm your changes.</p>
          <TextInput
            {...WriteSelectors.commitMessage}
            onChange={handleDeleteCommit}
            value={selectedRule.comment}
            id="comment"
            type="text"
            label="Commit Message"
            isRequired
          />
        </div>
      </Column>
    </Row>
    <Row>
      <Column width={1} offset={10}>
        <Button
          className="sg-button"
          onClick={handleModalClose}
          id="isDeleteConfirmationOpen"
          type="secondary"
        >
          Close
        </Button>
      </Column>
      <Column width={1} offset={11}>
        <Button
          {...WriteSelectors.deleteConfirmationConfirm}
          className="sg-button"
          onClick={handleDeleteConfirm}
          type="primary"
        >
          Confirm
        </Button>
      </Column>
    </Row>
  </div>
);

const DeleteConfirmationModal = ({
  selectedRule,
  handleModalClose,
  handleDeleteConfirm,
  idToDelete,
  handleDeleteCommit,
  isCommitEmpty,
}) => (
  <CenterModal
    {...WriteSelectors.deleteConfirmation}
    open
    className="delete-confirm-modal"
    renderBody={(
      <ConfirmModalBody
        selectedRule={selectedRule}
        isCommitEmpty={isCommitEmpty}
        handleModalClose={handleModalClose}
        handleDeleteConfirm={handleDeleteConfirm}
        idToDelete={idToDelete}
        handleDeleteCommit={handleDeleteCommit}
      />
)}
  />
);

export { DeleteConfirmationAlert };
export default DeleteConfirmationModal;
