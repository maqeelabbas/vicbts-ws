import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VCardComponent } from '@vicbts/shared/ui';
import { AuthService } from '@vicbts/shared/data-access/auth';

@Component({
  selector: 'lib-dashboard-page',
  standalone: true,
  imports: [CommonModule, VCardComponent],
  template: `
    <div class="page-container">
      <lib-v-card title="Dashboard" subtitle="Welcome back, {{ userName }}">
        <div class="dashboard-content">
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-value">1,234</div>
              <div class="stat-label">Total Users</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">567</div>
              <div class="stat-label">Active Sessions</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">89%</div>
              <div class="stat-label">Success Rate</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">42</div>
              <div class="stat-label">Pending Tasks</div>
            </div>
          </div>

          <div class="recent-activity">
            <h3>Recent Activity</h3>
            <div class="activity-list">
              <div class="activity-item">
                <span class="activity-icon">📊</span>
                <span class="activity-text">Report generated successfully</span>
                <span class="activity-time">2 hours ago</span>
              </div>
              <div class="activity-item">
                <span class="activity-icon">👤</span>
                <span class="activity-text">New user registration</span>
                <span class="activity-time">4 hours ago</span>
              </div>
              <div class="activity-item">
                <span class="activity-icon">⚙️</span>
                <span class="activity-text">System settings updated</span>
                <span class="activity-time">1 day ago</span>
              </div>
            </div>
          </div>
        </div>
      </lib-v-card>
    </div>
  `,
  styles: [`
    .page-container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .dashboard-content {
      padding: 1rem;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .stat-card {
      background: linear-gradient(135deg, #696cff 0%, #5f61e6 100%);
      padding: 1.5rem;
      border-radius: 0.5rem;
      color: #fff;
      text-align: center;
    }

    .stat-value {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    .stat-label {
      font-size: 0.875rem;
      opacity: 0.9;
    }

    .recent-activity h3 {
      color: #566a7f;
      margin-bottom: 1rem;
    }

    .activity-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .activity-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background: #f8f9fa;
      border-radius: 0.375rem;
    }

    .activity-icon {
      font-size: 1.5rem;
    }

    .activity-text {
      flex: 1;
      color: #566a7f;
    }

    .activity-time {
      color: #8592a3;
      font-size: 0.875rem;
    }
  `],
})
export class DashboardPageComponent implements OnInit {
  private authService = inject(AuthService);
  userName = '';

  ngOnInit(): void {
    const user = this.authService.currentUser;
    this.userName = user ? `${user.firstName} ${user.lastName}` : 'User';
  }
}
