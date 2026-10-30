'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ProtectedRoute from '../../components/ProtectedRoute';
import { Booking } from '../../types';
import { apiGetMyBookings, apiCancelBooking } from '../../lib/api';
import {
  CalendarCheck2,
  Calendar,
  Clock,
  MapPin,
  DollarSign,
  FileDown,
  XCircle,
  AlertTriangle,
  X,
  Compass,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { toast } from 'sonner';
import { jsPDF } from 'jspdf';

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  // Cancellation Modal State
  const [cancelTarget, setCancelTarget] = useState<Booking | null>(null);
  const [cancelling, setCancelling] = useState(false);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await apiGetMyBookings();
      if (res.success && res.bookings) {
        setBookings(res.bookings);
      }
    } catch (err: any) {
      toast.error(err.message || 'Could not fetch your reservations.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleConfirmCancel = async () => {
    if (!cancelTarget) return;

    try {
      setCancelling(true);
      const res = await apiCancelBooking(cancelTarget._id);
      toast.success(res.message || 'Reservation cancelled.');
      setBookings((prev) =>
        prev.map((b) => (b._id === cancelTarget._id ? { ...b, status: 'Cancelled' } : b))
      );
      setCancelTarget(null);
    } catch (err: any) {
      toast.error(err.message || 'Failed to cancel reservation.');
    } finally {
      setCancelling(false);
    }
  };

  // Optional Requirement: PDF Booking Invoice Generator
  const generateInvoicePDF = (booking: Booking) => {
    try {
      const doc = new jsPDF();

      // Brand Header
      doc.setFillColor(249, 115, 22); // Orange
      doc.rect(0, 0, 210, 32, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(22);
      doc.setFont('helvetica', 'bold');
      doc.text('STUDIOSPACE PRODUCTION RECEIPT', 14, 20);

      // Invoice Meta
      doc.setTextColor(50, 50, 50);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`Booking Reference ID: ${booking._id}`, 14, 42);
      doc.text(`Generated Date: ${new Date().toLocaleDateString()}`, 14, 48);
      doc.text(`Reservation Status: ${booking.status.toUpperCase()}`, 14, 54);

      // Creator & Studio Details Box
      doc.setDrawColor(220, 220, 220);
      doc.setFillColor(248, 250, 252);
      doc.roundedRect(14, 62, 182, 38, 3, 3, 'FD');

      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text('RESERVED WORKSPACE:', 20, 72);
      doc.setFont('helvetica', 'normal');
      doc.text(`${booking.studioTitle} (${booking.studioCategory})`, 20, 78);
      doc.text(`Location: ${booking.studioLocation}`, 20, 84);
      doc.text(`Creator Client: ${booking.userName} (${booking.userEmail})`, 20, 92);

      // Session Schedule
      doc.roundedRect(14, 106, 182, 34, 3, 3, 'FD');
      doc.setFont('helvetica', 'bold');
      doc.text('SESSION SCHEDULE:', 20, 116);
      doc.setFont('helvetica', 'normal');
      doc.text(`Shoot Date: ${booking.bookingDate}`, 20, 123);
      doc.text(`Reserved Hours: ${booking.startTime} - ${booking.endTime} (${booking.durationHours} Hours)`, 20, 130);

      // Financial Breakdown Table
      doc.setFont('helvetica', 'bold');
      doc.text('FINANCIAL STATEMENT', 14, 152);

      doc.setDrawColor(200, 200, 200);
      doc.line(14, 156, 196, 156);

      doc.setFont('helvetica', 'normal');
      doc.text(`Studio Hourly Rate:`, 14, 166);
      doc.text(`$${booking.hourlyRate}.00 / hr`, 160, 166);

      doc.text(`Duration (${booking.durationHours} hrs x $${booking.hourlyRate}):`, 14, 174);
      doc.text(`$${booking.totalPrice}.00`, 160, 174);

      doc.text(`Security Deposit (Refundable Escrow):`, 14, 182);
      doc.text(`$${booking.securityDeposit || 0}.00`, 160, 182);

      doc.line(14, 188, 196, 188);

      doc.setFontSize(13);
      doc.setFont('helvetica', 'bold');
      doc.text('TOTAL RESERVATION DUE:', 14, 198);
      doc.setTextColor(234, 88, 12);
      doc.text(`$${booking.totalPrice + (booking.securityDeposit || 0)}.00 USD`, 140, 198);

      // Footer
      doc.setTextColor(130, 130, 130);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'italic');
      doc.text(
        'Thank you for booking through StudioSpace. For 24/7 host assistance, visit studiospace.io/support.',
        14,
        240
      );

      doc.save(`StudioSpace_Invoice_${booking._id.slice(-6)}.pdf`);
      toast.success('Downloaded PDF booking invoice successfully!');
    } catch (err: any) {
      toast.error('Could not generate PDF invoice.');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
      case 'Pending':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
      case 'Completed':
        return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20';
      case 'Cancelled':
        return 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20';
      default:
        return 'bg-zinc-100 text-zinc-600 border-zinc-200';
    }
  };

  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
        
        {/* Page Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-bold uppercase tracking-wider">
              <CalendarCheck2 className="w-3.5 h-3.5" />
              Creator Reservations
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white tracking-tight">
              My Bookings
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
              Track reserved shoot hours, download PDF invoices, and manage pending session cancellations.
            </p>
          </div>

          <Link
            href="/studios"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm shadow-lg shadow-orange-500/20 transition-all self-start sm:self-auto"
          >
            <Compass className="w-4 h-4" />
            Find More Studios
          </Link>
        </div>

        {/* Loading Skeletons */}
        {loading && (
          <div className="space-y-4">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-32 rounded-3xl bg-zinc-200 dark:bg-zinc-800 animate-pulse w-full"
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && bookings.length === 0 && (
          <div className="p-12 sm:p-16 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-center max-w-lg mx-auto space-y-4 shadow-sm">
            <div className="w-16 h-16 rounded-3xl bg-orange-500/10 text-orange-500 flex items-center justify-center mx-auto">
              <CalendarCheck2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-zinc-900 dark:text-white">
              No Studio Bookings Found
            </h3>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              You haven't reserved any creative workspaces yet. Explore our directory of photography lofts, podcast rooms, and sound stages.
            </p>
            <Link
              href="/studios"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md transition-colors"
            >
              <Compass className="w-4 h-4" />
              Explore Available Studios
            </Link>
          </div>
        )}

        {/* Bookings Card List */}
        {!loading && bookings.length > 0 && (
          <div className="space-y-4">
            {bookings.map((item) => (
              <div
                key={item._id}
                className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:border-orange-500/30 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                {/* Left: Studio Visuals & Info */}
                <div className="flex items-center gap-5">
                  <div className="relative w-28 h-24 rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 flex-shrink-0">
                    <img
                      src={item.studioImage}
                      alt={item.studioTitle}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-black/60 text-white backdrop-blur-md">
                      {item.studioCategory}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h3 className="font-extrabold text-base sm:text-lg text-zinc-900 dark:text-white line-clamp-1">
                        {item.studioTitle}
                      </h3>
                      {/* Status Badge (Requirement: Pending, Confirmed, Completed, Cancelled) */}
                      <span
                        className={`px-3 py-0.5 rounded-full text-xs font-extrabold uppercase tracking-wider border ${getStatusBadge(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                      <MapPin className="w-3.5 h-3.5 text-orange-500" />
                      <span className="truncate max-w-[280px]">{item.studioLocation}</span>
                    </div>

                    {/* Schedule Row */}
                    <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-600 dark:text-zinc-300 font-medium">
                      <span className="flex items-center gap-1 font-bold text-zinc-900 dark:text-white">
                        <Calendar className="w-3.5 h-3.5 text-orange-500" />
                        {item.bookingDate}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-orange-500" />
                        {item.startTime} - {item.endTime} ({item.durationHours} hrs)
                      </span>
                      <span>•</span>
                      <span className="font-mono font-bold text-orange-500">
                        Total: ${item.totalPrice}
                      </span>
                    </div>

                    {item.creatorNotes && (
                      <p className="text-[11px] text-zinc-400 italic line-clamp-1">
                        Notes: "{item.creatorNotes}"
                      </p>
                    )}
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex flex-wrap items-center gap-2.5 self-end lg:self-center">
                  
                  {/* Download PDF Invoice (Optional Requirement) */}
                  <button
                    onClick={() => generateInvoicePDF(item)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-bold transition-colors"
                    title="Download Official PDF Receipt"
                  >
                    <FileDown className="w-3.5 h-3.5 text-orange-500" />
                    Invoice (PDF)
                  </button>

                  {/* Cancel Booking Option (Requirement: Cancel Booking option for pending slots) */}
                  {item.status === 'Pending' && (
                    <button
                      onClick={() => setCancelTarget(item)}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-bold transition-colors"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      Cancel Booking
                    </button>
                  )}

                  <Link
                    href={`/studios/${item.studioId}`}
                    className="inline-flex items-center gap-1 px-3.5 py-2.5 rounded-xl text-xs font-bold text-zinc-500 hover:text-orange-500 transition-colors"
                  >
                    View Studio
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Cancellation Confirmation Custom Modal */}
        {cancelTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-150">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-5 shadow-2xl relative">
              <button
                onClick={() => setCancelTarget(null)}
                className="absolute top-5 right-5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 stroke-[2.2]" />
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-zinc-900 dark:text-white">
                  Cancel Reservation?
                </h3>
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                  Are you sure you want to cancel your upcoming session at <strong>{cancelTarget.studioTitle}</strong> for {cancelTarget.bookingDate} ({cancelTarget.startTime} - {cancelTarget.endTime})?
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setCancelTarget(null)}
                  disabled={cancelling}
                  className="w-1/2 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  Keep Reservation
                </button>

                <button
                  type="button"
                  onClick={handleConfirmCancel}
                  disabled={cancelling}
                  className="w-1/2 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5"
                >
                  {cancelling ? (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <XCircle className="w-3.5 h-3.5" />
                      Yes, Cancel
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
