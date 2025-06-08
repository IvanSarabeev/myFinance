import { FC, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

/**
 * @component
 * @access Private
 * CreateTransaction is a functional React component.
 */
const CreateTransaction: FC = () => {
  const [isActive, setIsActive] = useState(true);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Create a New Transaction Account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label>Wallet</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Wallet" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="wallet1">Wallet 1</SelectItem>
                <SelectItem value="wallet2">Wallet 2</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Account Name */}
          <div>
            <Label>Account Name</Label>
            <Input placeholder="e.g. Emergency Fund" />
          </div>

          {/* Currency and Balance */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Currency</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usd">USD</SelectItem>
                  <SelectItem value="eur">EUR</SelectItem>
                  <SelectItem value="gbp">GBP</SelectItem>
                  <SelectItem value="jpy">JPY</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Balance</Label>
              <Input type="number" placeholder="0.00" />
            </div>
          </div>

          {/* Description */}
          <div>
            <Label>Description</Label>
            <Textarea placeholder="Brief description..." />
          </div>

          {/* Icon Upload or Select */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Select Icon</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Choose Icon" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="piggy">🐷 Piggy Bank</SelectItem>
                  <SelectItem value="wallet">👛 Wallet</SelectItem>
                  <SelectItem value="safe">🔐 Safe</SelectItem>
                  <SelectItem value="bank">🏦 Bank</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Or Upload Icon</Label>
              <Input type="file" accept="image/*" />
            </div>
          </div>

          {/* Account Type and Status */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Account Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="deposit">Deposit</SelectItem>
                  <SelectItem value="saving">Saving</SelectItem>
                  <SelectItem value="investment">Investment</SelectItem>
                  <SelectItem value="standard">Standard</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-4 mt-6">
              <Label htmlFor="active-switch">Status</Label>
              <Switch
                id="active-switch"
                checked={isActive}
                onCheckedChange={setIsActive}
              />
              <span>{isActive ? 'Active' : 'Inactive'}</span>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4">
            <Button type="submit">Create Transaction</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateTransaction;
