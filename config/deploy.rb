# config valid only for Capistrano 3.1
# lock '3.1.0'

set :application, 'backend'
set :repo_url, 'git@github.com:kuaijihudong/backend.git'
# ask :branch, :platform_mode
# Default branch is :master
# ask :branch, proc { `git rev-parse --abbrev-ref HEAD`.chomp }

# Default deploy_to directory is /var/www/my_app
set :deploy_to, '/var/www/backend'
# Default value for :scm is :git
# set :scm, :git

# Default value for :format is :pretty
# set :format, :pretty

# Default value for :log_level is :debug
# set :log_level, :debug

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
set :linked_files, %w{config/database.yml config/config.yml config/secrets.yml config/unicorn/production.rb}

# Default value for linked_dirs is []
# set :linked_dirs, %w{bin log tmp/pids tmp/cache tmp/sockets vendor/bundle public/system}
set :linked_dirs, %w{bin log tmp/pids tmp/cache tmp/sockets vendor/bundle public/system}

# Default value for default_env is {}
set :default_env, { path: "/usr/local/ruby/bin:$PATH" }
# Default value for keep_releases is 5
# set :keep_releases, 5

# def run_remote_rake(rake_cmd)
#   rake_args = ENV['RAKE_ARGS'].to_s.split(',')
#
#   cmd = "cd #{fetch(:latest_release)} && bundle exec #{fetch(:rake, "rake")} RAILS_ENV=#{fetch(:rails_env, "production")} #{rake_cmd}"
#   cmd += "['#{rake_args.join("','")}']" unless rake_args.empty?
#   %x|#{cmd}|
# end

namespace :deploy do
  after :publishing, :restart

  desc 'Restart application'
  task :restart do
    # on roles(:worker), in: :groups, limit: 3, wait: 10 do
    #   within release_path do
    #     execute :rake, "db:seed RAILS_ENV=production"
    #   end
    # end
    invoke 'unicorn:restart'
  end



  # after :restart, :restart_workers

  # after :restart, :clear_cache do
  #   on roles(:web), in: :groups, limit: 3, wait: 10 do
      # Here we can do anything such as:
      # within release_path do
      #   execute :rake, 'cache:clear'
      # end
      #
    # end
  # end









end
