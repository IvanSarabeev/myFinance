/* eslint-disable react-refresh/only-export-components */
import { FC } from 'react';
import BaseModal from '@/components/BaseModal';
import { observer } from 'mobx-react-lite';
import useStore from '@/hooks/useStore';
import AddIncomeForm from './form/AddIncomeForm';

type CreateIncomeModalProps = {
  onClose: () => void;
};

const CreateIncomeModal: FC<CreateIncomeModalProps> = ({ onClose }) => {
  const { incomeStore } = useStore();

  const { incomeForm, addIncome, setFormField } = incomeStore;

  return (
    <BaseModal isOpen onClose={onClose} className="w-6/12">
      <div className="flexBetween p4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
        <h3 className="regular-18 font-medium text-gray-900 dark:text-white">
          Add Income
        </h3>
      </div>

      <div className="">
        <AddIncomeForm
          incomeForm={incomeForm}
          handleAddIncome={addIncome}
          setFormField={setFormField}
        />
      </div>
    </BaseModal>
  );
};

export default observer(CreateIncomeModal);
