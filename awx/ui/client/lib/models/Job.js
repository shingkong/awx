let $http;
let BaseModel;

function getStats () {
    if (!this.has('GET', 'id')) {
        return Promise.reject(new Error('No property, id, exists'));
    }

    if (!this.has('GET', 'related.job_events')) {
        return Promise.reject(new Error('No related property, job_events, exists'));
    }

    const req = {
        method: 'GET',
        url: `${this.path}${this.get('id')}/job_events/`,
        params: { event: 'playbook_on_stats' },
    };

    return $http(req)
        .then(({ data }) => {
            if (data.results.length > 0) {
                return data.results[0];
            }

            return null;
        });
}


function JobModel (method, resource, config) {
    BaseModel.call(this, 'jobs');

    this.getStats = getStats;

    this.Constructor = JobModel;

    return this.create(method, resource, config);
}

function JobModelLoader (_$http_, _BaseModel_) {
    $http = _$http_;
    BaseModel = _BaseModel_;

    return JobModel;
}

JobModelLoader.$inject = [
    '$http',
    'BaseModel'
];

export default JobModelLoader;
