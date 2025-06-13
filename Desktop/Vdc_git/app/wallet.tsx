import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Wallet, Plus, ArrowUpRight, ArrowDownLeft, CreditCard, Smartphone, Gift, Clock, CircleCheck as CheckCircle, X } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

export default function WalletScreen() {
  const { colors } = useTheme();
  
  const transactions = [
    {
      id: 1,
      type: 'credit',
      title: 'Wallet Top-up',
      description: 'Added via UPI',
      amount: '₹1,000',
      date: '2 hours ago',
      status: 'completed',
      method: 'UPI'
    },
    {
      id: 2,
      type: 'debit',
      title: 'Blood Test Payment',
      description: 'Complete Blood Count - Apollo Diagnostics',
      amount: '₹450',
      date: '1 day ago',
      status: 'completed',
      method: 'wallet'
    },
    {
      id: 3,
      type: 'credit',
      title: 'Cashback Reward',
      description: 'First consultation bonus',
      amount: '₹150',
      date: '3 days ago',
      status: 'completed',
      method: 'cashback'
    },
    {
      id: 4,
      type: 'debit',
      title: 'Doctor Consultation',
      description: 'Dr. Sarah Johnson - Video Call',
      amount: '₹800',
      date: '5 days ago',
      status: 'completed',
      method: 'wallet'
    },
    {
      id: 5,
      type: 'credit',
      title: 'Referral Bonus',
      description: 'Friend signup reward',
      amount: '₹200',
      date: '1 week ago',
      status: 'completed',
      method: 'bonus'
    },
    {
      id: 6,
      type: 'debit',
      title: 'Health Package',
      description: 'Annual Health Checkup',
      amount: '₹2,499',
      date: '2 weeks ago',
      status: 'failed',
      method: 'wallet'
    }
  ];

  const quickActions = [
    { id: 1, title: 'Add Money', icon: Plus, color: colors.success, action: () => {} },
    { id: 2, title: 'Pay Bills', icon: CreditCard, color: colors.primary, action: () => {} },
    { id: 3, title: 'Send Money', icon: ArrowUpRight, color: colors.accent, action: () => {} },
    { id: 4, title: 'Rewards', icon: Gift, color: colors.warning, action: () => {} },
  ];

  const getTransactionIcon = (type: string, method: string) => {
    if (type === 'credit') {
      if (method === 'cashback' || method === 'bonus') return Gift;
      return ArrowDownLeft;
    }
    return ArrowUpRight;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'failed': return X;
      case 'pending': return Clock;
      default: return Clock;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return colors.success;
      case 'failed': return colors.error;
      case 'pending': return colors.warning;
      default: return colors.textSecondary;
    }
  };

  const styles = createStyles(colors);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>My Wallet</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <View style={styles.balanceHeader}>
            <View style={styles.walletIcon}>
              <Wallet size={24} color={colors.primary} />
            </View>
            <Text style={styles.balanceLabel}>Available Balance</Text>
          </View>
          <Text style={styles.balanceAmount}>₹2,450.00</Text>
          <View style={styles.balanceFooter}>
            <View style={styles.healthCredits}>
              <Text style={styles.healthCreditsLabel}>Health Credits</Text>
              <Text style={styles.healthCreditsAmount}>₹350</Text>
            </View>
            <TouchableOpacity style={styles.addMoneyButton}>
              <Plus size={16} color="#FFFFFF" />
              <Text style={styles.addMoneyText}>Add Money</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action) => (
              <TouchableOpacity key={action.id} style={styles.quickActionCard} onPress={action.action}>
                <View style={[styles.quickActionIcon, { backgroundColor: `${action.color}20` }]}>
                  <action.icon size={20} color={action.color} />
                </View>
                <Text style={styles.quickActionTitle}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Offers & Cashback */}
        <View style={styles.section}>
          <View style={styles.offerCard}>
            <View style={styles.offerIcon}>
              <Gift size={20} color={colors.warning} />
            </View>
            <View style={styles.offerContent}>
              <Text style={styles.offerTitle}>Get ₹100 Cashback</Text>
              <Text style={styles.offerDescription}>
                Add ₹500 or more and get ₹100 cashback on your first transaction
              </Text>
            </View>
            <TouchableOpacity style={styles.offerButton}>
              <Text style={styles.offerButtonText}>Claim</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Transaction History */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>View All</Text>
            </TouchableOpacity>
          </View>
          
          {transactions.map((transaction) => {
            const TransactionIcon = getTransactionIcon(transaction.type, transaction.method);
            const StatusIcon = getStatusIcon(transaction.status);
            const statusColor = getStatusColor(transaction.status);
            
            return (
              <View key={transaction.id} style={styles.transactionItem}>
                <View style={[
                  styles.transactionIcon, 
                  { backgroundColor: transaction.type === 'credit' ? `${colors.success}20` : `${colors.error}20` }
                ]}>
                  <TransactionIcon 
                    size={16} 
                    color={transaction.type === 'credit' ? colors.success : colors.error} 
                  />
                </View>
                
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionTitle}>{transaction.title}</Text>
                  <Text style={styles.transactionDescription}>{transaction.description}</Text>
                  <View style={styles.transactionMeta}>
                    <Text style={styles.transactionDate}>{transaction.date}</Text>
                    <View style={styles.transactionStatus}>
                      <StatusIcon size={10} color={statusColor} />
                      <Text style={[styles.transactionStatusText, { color: statusColor }]}>
                        {transaction.status}
                      </Text>
                    </View>
                  </View>
                </View>
                
                <View style={styles.transactionAmount}>
                  <Text style={[
                    styles.transactionAmountText,
                    { color: transaction.type === 'credit' ? colors.success : colors.error }
                  ]}>
                    {transaction.type === 'credit' ? '+' : '-'}{transaction.amount}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function createStyles(colors: any) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 16,
    },
    backButton: {
      marginRight: 16,
    },
    title: {
      flex: 1,
      fontSize: 20,
      color: colors.text,
      fontFamily: 'Inter-SemiBold',
      textAlign: 'center',
    },
    balanceCard: {
      backgroundColor: colors.surface,
      borderRadius: 20,
      padding: 24,
      marginHorizontal: 20,
      marginBottom: 24,
      borderWidth: 1,
      borderColor: colors.border,
    },
    balanceHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    walletIcon: {
      backgroundColor: `${colors.primary}20`,
      padding: 8,
      borderRadius: 8,
      marginRight: 12,
    },
    balanceLabel: {
      fontSize: 14,
      color: colors.textSecondary,
      fontFamily: 'Inter-Regular',
    },
    balanceAmount: {
      fontSize: 32,
      color: colors.text,
      fontFamily: 'Inter-Bold',
      marginBottom: 20,
    },
    balanceFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    healthCredits: {
      flex: 1,
    },
    healthCreditsLabel: {
      fontSize: 12,
      color: colors.textSecondary,
      fontFamily: 'Inter-Regular',
      marginBottom: 2,
    },
    healthCreditsAmount: {
      fontSize: 16,
      color: colors.warning,
      fontFamily: 'Inter-SemiBold',
    },
    addMoneyButton: {
      backgroundColor: colors.primary,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 8,
    },
    addMoneyText: {
      fontSize: 14,
      color: '#FFFFFF',
      fontFamily: 'Inter-SemiBold',
      marginLeft: 6,
    },
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 18,
      color: colors.text,
      fontFamily: 'Inter-SemiBold',
      paddingHorizontal: 20,
      marginBottom: 16,
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      marginBottom: 16,
    },
    seeAll: {
      fontSize: 14,
      color: colors.primary,
      fontFamily: 'Inter-Medium',
    },
    quickActionsGrid: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      gap: 12,
    },
    quickActionCard: {
      flex: 1,
      backgroundColor: colors.surface,
      padding: 16,
      borderRadius: 12,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
    },
    quickActionIcon: {
      padding: 8,
      borderRadius: 8,
      marginBottom: 8,
    },
    quickActionTitle: {
      fontSize: 12,
      color: colors.text,
      fontFamily: 'Inter-Medium',
      textAlign: 'center',
    },
    offerCard: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 16,
      marginHorizontal: 20,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
    },
    offerIcon: {
      backgroundColor: `${colors.warning}20`,
      padding: 8,
      borderRadius: 8,
      marginRight: 12,
    },
    offerContent: {
      flex: 1,
    },
    offerTitle: {
      fontSize: 14,
      color: colors.text,
      fontFamily: 'Inter-SemiBold',
      marginBottom: 4,
    },
    offerDescription: {
      fontSize: 12,
      color: colors.textSecondary,
      fontFamily: 'Inter-Regular',
      lineHeight: 16,
    },
    offerButton: {
      backgroundColor: colors.warning,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 6,
    },
    offerButtonText: {
      fontSize: 12,
      color: '#FFFFFF',
      fontFamily: 'Inter-SemiBold',
    },
    transactionItem: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 16,
      marginHorizontal: 20,
      marginBottom: 8,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
    },
    transactionIcon: {
      padding: 8,
      borderRadius: 8,
      marginRight: 12,
    },
    transactionDetails: {
      flex: 1,
    },
    transactionTitle: {
      fontSize: 14,
      color: colors.text,
      fontFamily: 'Inter-SemiBold',
      marginBottom: 4,
    },
    transactionDescription: {
      fontSize: 12,
      color: colors.textSecondary,
      fontFamily: 'Inter-Regular',
      marginBottom: 6,
    },
    transactionMeta: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    transactionDate: {
      fontSize: 10,
      color: colors.textSecondary,
      fontFamily: 'Inter-Regular',
    },
    transactionStatus: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    transactionStatusText: {
      fontSize: 10,
      fontFamily: 'Inter-Medium',
      marginLeft: 4,
      textTransform: 'capitalize',
    },
    transactionAmount: {
      alignItems: 'flex-end',
    },
    transactionAmountText: {
      fontSize: 14,
      fontFamily: 'Inter-SemiBold',
    },
  });
}